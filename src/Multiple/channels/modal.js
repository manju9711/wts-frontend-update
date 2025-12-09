const Modal = ({ isOpen, closeModal, mediaItem }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg p-4 w-full max-w-[85%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%]">
        <button
          className="absolute top-2 right-2 text-black font-bold text-2xl"
          onClick={closeModal}
        >
          &times;
        </button>
        {mediaItem.type === 'image' ? (  // mediaItem.type ஐ image என சரிபார்க்கிறது
          <img src={mediaItem.src} alt="Modal Content" className="w-full h-[70vh] object-contain" />  
        ) : (
          <video src={mediaItem.src} className="w-full h-[70vh] object-contain" controls loop muted />  
        )}
      </div>
    </div>
  );
};

export default Modal;