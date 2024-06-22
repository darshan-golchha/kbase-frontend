import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useParams } from 'react-router-dom';
import Appbar from './Appbar';
import CSVRenderer from '../services/CSVRenderer';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const View = () => {
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();

    const [searchRes, setSearchRes] = useState([]);
    const [numPages, setNumPages] = useState(null);

    const [isFileRendered, setIsFileRendered] = useState(false);
    const [fileContent, setFileContent] = useState(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axiosPrivate.get(`https://kbase-backend-b5135e83fa8d.herokuapp.com/search/${id}`);
                setSearchRes(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchRes([]);
            }
        };

        fetchSearchResults();
    }, [id, axiosPrivate]);

    const getFileContent = async (fileName, menuId) => {
        try {
            const response = await axiosPrivate.get(`https://kbase-backend-b5135e83fa8d.herokuapp.com/files/${fileName}/menu/${menuId}`);

            if (response.status === 200) {
                return response.data; // Access the 'data' property to get the content
            } else {
                console.error('Error retrieving file content:', response.status);
                return '';
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            return '';
        }
    };

    const fetchMediaFile = async (fileUrl) => {
        try {
            const response = await axiosPrivate.get(fileUrl, { responseType: 'blob' });
            return response.data;
        } catch (error) {
            console.error('Error fetching media file:', error);
            return null;
        }
    };

    const fetchPDFFile = async (fileUrl) => {
        try {
            const response = await axiosPrivate.get(fileUrl, { responseType: 'blob' });
            return response.data;
        } catch (error) {
            console.error('Error fetching PDF file:', error);
            return null;
        }
    };

    const fetchCSVFile = async (fileUrl) => {
        try {
          const response = await axiosPrivate.get(fileUrl, {
            responseType: 'text', // Set the responseType to 'text'
            headers: {
              Accept: 'text/csv', // Set the Accept header to indicate the expected response type
            },
          });
          return response.data;
        } catch (error) {
          console.error('Error fetching CSV file:', error);
          return null;
        }
      };

      const fetchXLSXFile = async (fileUrl) => {
        try {
          const response = await axiosPrivate.get(fileUrl, {
            responseType: 'arraybuffer', // Set the responseType to 'arraybuffer' for XLSX
          });
          return response.data;
        } catch (error) {
          console.error('Error fetching XLSX file:', error);
          return null;
        }
      };
      


    const getPdf = async (fileUrl) => {
        try {
            const windowHeight = window.innerHeight; // Get the height of the window
            const contentHeight = windowHeight - 100; // Adjust for any top/bottom margins or paddings

            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflowY: 'auto' }}>
                    <Document
                        file={fileUrl}
                        onLoadSuccess={({ numPages }) => {
                            // Calculate the scale factor based on the number of pages and the available content height
                            const scale = contentHeight / (numPages * 50);
                            setNumPages(numPages);
                            setScale(scale); // Store the scale factor in state
                        }}
                    >
                        {Array.from(new Array(numPages), (_, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1} width={window.innerWidth * scale} />
                        ))}
                    </Document>
                </div>
            );
        } catch (error) {
            console.error('Error rendering PDF:', error);
            return <Typography>Error loading PDF</Typography>;
        }
    };


    const getExtension = (path) => {
        const baseName = path.split(/[\\/]/).pop();
        const pos = baseName.lastIndexOf('.');
        if (baseName === '' || pos < 1) {
            return '';
        }
        return baseName.slice(pos + 1);
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axiosPrivate.get(`https://kbase-backend-b5135e83fa8d.herokuapp.com/search/${id}`);
                setSearchRes(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchRes([]);
            }
        };

        fetchSearchResults();
    }, [id, axiosPrivate]);


    const renderFile = (item) => {
        const extension = getExtension(item.filePath);
        const fileUrl = `https://kbase-backend-b5135e83fa8d.herokuapp.com/files/${item.fileName}/menu/${item.menu.menuId}`;

        switch (extension) {
            case 'txt':
                const getText = async () => {
                    try {
                        const textContent = await getFileContent(item.fileName, item.menu.menuId);
                        return `${textContent}`
                    } catch (error) {
                        console.error('Error rendering text file:', error);
                        return 'Error loading text file';
                    }
                }

                if (!isFileRendered) {
                    setIsFileRendered(true);
                    (async () => {
                        const content = await getText();
                        setFileContent(<pre>{content}</pre>);
                    })();
                }
                break;
            case 'jpg':
            case 'jpeg':
            case 'png':
                const getImage = async () => {
                    try {
                        const mediaBlob = await fetchMediaFile(fileUrl);
                        console.log(fileUrl);
                        if (mediaBlob) {
                            const objectURL = URL.createObjectURL(mediaBlob);
                            return <img src={objectURL} alt={item.fileName} />;

                        } else {
                            return <Typography>Error loading image</Typography>;
                        }
                    } catch (error) {
                        console.error('Error rendering image:', error);
                        return <Typography>Error loading image</Typography>;
                    }
                }
                if (!isFileRendered) {
                    setIsFileRendered(true);
                    (async () => {
                        const content = await getImage();
                        setFileContent(content);
                    })();
                }
                break;
            case 'mp3':
                const getAudio = async () => {
                    try {
                        const mediaBlob = await fetchMediaFile(fileUrl);
                        if (mediaBlob) {
                            const objectURL = URL.createObjectURL(mediaBlob);
                            return <audio src={objectURL} controls>
                                Your browser does not support the audio tag.
                            </audio>;
                        } else {
                            return <Typography>Error loading audio</Typography>;
                        }
                    } catch (error) {
                        console.error('Error rendering audio:', error);
                        return <Typography>Error loading audio</Typography>;
                    }
                }
                if (!isFileRendered) {
                    setIsFileRendered(true);
                    (async () => {
                        const content = await getAudio();
                        setFileContent(content);
                    })();
                }
                break;
            case 'mp4':
            case 'mov':
                const getVideo = async () => {
                    try {
                        const mediaBlob = await fetchMediaFile(fileUrl);
                        if (mediaBlob) {
                            const objectURL = URL.createObjectURL(mediaBlob);
                            return <video src={objectURL} controls>
                                Your browser does not support the video tag.
                            </video>;
                        } else {
                            return <Typography>Error loading video</Typography>;
                        }
                    } catch (error) {
                        console.error('Error rendering video:', error);
                        return <Typography>Error loading video</Typography>;
                    }
                }
                if (!isFileRendered) {
                    setIsFileRendered(true);
                    (async () => {
                        const content = await getVideo();
                        setFileContent(content);
                    })();
                }
                break;
            case 'pdf':
                if (!isFileRendered) {
                    setIsFileRendered(true);
                    (async () => {
                        const pdfBlob = await fetchPDFFile(fileUrl);
                        if (pdfBlob) {
                            const pdfObjectURL = URL.createObjectURL(pdfBlob);
                            setFileContent(await getPdf(pdfObjectURL));
                        } else {
                            setFileContent(<Typography>Error loading PDF</Typography>);
                        }
                    })();
                }
                break;
            case 'docx':
                <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${fileUrl}`} width="100%" height="600px" frameBorder="0" />
                break;
            case 'xlsx':
                <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${fileUrl}`} width="100%" height="600px" frameBorder="0" />
                break;
            case 'csv':
                if (!isFileRendered) {
                    setIsFileRendered(true);
                    (async () => {
                        const csvContent = await fetchCSVFile(fileUrl);
                        if (csvContent) {
                            setFileContent(<CSVRenderer csvData={csvContent} />);
                        } else {
                            setFileContent(<Typography>Error loading CSV</Typography>);
                        }
                    })();
                }
                break;
            default:
                return <Typography>Unsupported file format</Typography>;
        }
    };

    return (
        <div>
            <Appbar />
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                margin: '2em',
                width: '100vw',
                height: '100vh',
            }}>
                {searchRes.map((item) => (
                    <div key={item.id}>
                        {renderFile(item)}
                        {fileContent}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default View;