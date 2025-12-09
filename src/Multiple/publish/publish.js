import React, { useEffect, useState } from 'react';
import Publishbanner from './publishbanner';
import { get } from '../../service/apiservice';
import { Allapi } from '../../constant/constantApi';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // For accessibility

const Publish = () => {
  const [books, setBooks] = useState([]); // State to store books data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle error
  const { t, i18n } = useTranslation();

  // State to manage popup/modal
  const [selectedBook, setSelectedBook] = useState(null); // To store the clicked book's data
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  
  useEffect(() => {
    const fetchData = async (lang) => {
      try {
        const response = await get(`${Allapi.PUBLISH_getapi}?lang=${lang}`);
        setBooks(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch news data:', error);
        setLoading(false);
        setError('Error fetching data');
      }
    };

    fetchData(i18n.language);
  }, [i18n.language]);

  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  // Function to handle "View More" - opens file in a new tab
  const handleViewMore = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

 

  const handleDownload = (fileUrl) => {
    fetch(fileUrl)
      .then(response => response.blob()) // Convert the response to a Blob
      .then(blob => {
        // Determine the file extension based on MIME type
        const contentType = blob.type;
        let fileExtension = 'file'; // Default file name
  
        if (contentType.includes('pdf')) {
          fileExtension = 'file.pdf';
        } else if (contentType.includes('jpeg')) {
          fileExtension = 'file.jpeg';
        } else if (contentType.includes('jpg')) {
          fileExtension = 'file.jpg';
        } else if (contentType.includes('png')) {
          fileExtension = 'file.png';
        } else if (contentType.includes('webp')) {
          fileExtension = 'file.webp';
        }
  
        // Create a blob URL representing the file
        const blobUrl = window.URL.createObjectURL(blob);
  
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', fileExtension); // Use the determined extension
  
        // Append the link to the body
        document.body.appendChild(link);
  
        // Simulate a click to trigger the download
        link.click();
  
        // Clean up and remove the link from the document
        document.body.removeChild(link);
  
        // Revoke the blob URL to free up resources
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch(error => console.error('Error downloading file:', error));
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Publishbanner />
      <div className="bg-gray-100 p-6">
        <div className="justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-center">{t('header.publish')}</h2>
         
        </div>
        
        {/* Using grid layout to make it 4 cards per row and responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* {newsItems?.filter(event => event.isDisabled).map((item, index) => ( */}
          {books?.filter(event => event.isDisabled).map((book, index) => (
            <div 
              key={index} 
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
              onClick={() => openModal(book)} // Set up click event to open modal
            > 
              {/* Image and text inside the card */}
              {/* <img 
                src={book.image.startsWith('http') ? book.image : `${process.env.REACT_APP_API_URL}/public/${book.image}`} 
                alt={book.title} 
                className="w-full h-[400px] object-cover rounded-md" 
              /> */}
              <img 
  src={
    book.image?.startsWith('http') 
      ? book.image 
      : `${process.env.REACT_APP_API_URL}/public/${book.image || 'default-image.jpg'}`
  } 
  alt={book.title || 'Book'} 
  className="w-full h-[400px] object-cover rounded-md" 
/>


              <div className="mt-4">
                <h3 className="text-lg font-semibold text-center">{i18n.language === `TA` ? book.title_ta : book.title_en}</h3>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedBook && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Book Details"
          className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto sm:mt-[10%] mt-[20%] relative"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          {/* Close Button in Top-Right corner */}
          <button 
            onClick={closeModal} 
            className="absolute top-2 right-2 text-black-500 text-4xl font-bold">
            &times;
          </button>

          <div className="flex flex-col lg:flex-row">
            {/* Left side for image */}
            <div className="w-full lg:w-1/2 flex justify-center items-center p-4">
              <img 
                src={selectedBook.image.startsWith('http') ? selectedBook.image : `${process.env.REACT_APP_API_URL}/public/${selectedBook.image}`} 
                alt={selectedBook.title} 
                className="w-full h-auto max-h-[80vh] object-contain rounded-md" 
              />
            </div>

            {/* Right side for title and buttons */}
            <div className="w-full lg:w-1/2 p-4">
              <h2 className="text-2xl font-bold mb-4">{i18n.language === `TA` ? selectedBook.title_ta : selectedBook.title_en }</h2>
              {/* <p className="mb-4">This is a detailed description of the book or any additional information you would like to add.</p> */}
              
              <div className="flex space-x-4">
                <button 
                  className="bg-orange-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleViewMore(selectedBook.file.startsWith('http') ? selectedBook.file : `${process.env.REACT_APP_API_URL}/public/${selectedBook.file}`)}
                >
                  View More
                </button>

                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleDownload(`${process.env.REACT_APP_API_URL}/public/${selectedBook.file}`)}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Publish;































