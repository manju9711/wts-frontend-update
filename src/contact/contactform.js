// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';

// // aos
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const Contact = () => {
//     const { t } = useTranslation();
//     useEffect(() => {
//         AOS.init();
//     }, []);

//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         mobile: '',
//         subject: '',
//         message: ''
//     });

//     const [errors, setErrors] = useState({});
//     const [submitted, setSubmitted] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });

//         if (errors[name]) {
//             setErrors({
//                 ...errors,
//                 [name]: ''
//             });
//         }
//     };

//     const handlePhoneChange = (value) => {
//         setFormData({
//             ...formData,
//             mobile: value
//         });
//         console.log(value);

//         if (errors.mobile) {
//             setErrors({
//                 ...errors,
//                 mobile: ''
//             });
            
//         }
//     };

//     const handleBlur = (e) => {
//         const { name, value } = e.target;
//         let error = '';

//         if (!value) {
//             switch (name) {
//                 case 'name':
//                     error = 'Name is required';
//                     break;
//                 case 'email':
//                     error = 'Email is required';
//                     break;
//                 case 'mobile':
//                     error = 'Your Mobile number is required';
//                     break;
//                 case 'subject':
//                     error = 'Subject is required';
//                     break;
//                 case 'message':
//                     error = 'Message is required';
//                     break;
//                 default:
//                     break;
//             }
//         }

//         setErrors({
//             ...errors,
//             [name]: error
//         });
//     };

//     const validate = () => {
//         const newErrors = {};

//         if (!formData.name) newErrors.name = 'Name is required';
//         if (!formData.email) {
//             newErrors.email = 'Email is required';
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = 'Email is invalid';
//         }
//         if (!formData.mobile) newErrors.mobile = 'Your Mobile number is required';
//         if (!formData.subject) newErrors.subject = 'Subject is required';
//         if (!formData.message) newErrors.message = 'Message is required';

//         return newErrors;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const validationErrors = validate();
//         if (Object.keys(validationErrors).length === 0) {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contact/contacts`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(formData)
//                 });

//                 if (response.ok) {
//                     console.log('Form submitted successfully');
//                     setFormData({
//                         name: '',
//                         email: '',
//                         mobile: '',
//                         subject: '',
//                         message: ''
//                     });
//                     setErrors({});
//                     setSubmitted(true);
//                 } else {
//                     console.error('Error submitting the form');
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         } else {
//             setErrors(validationErrors);
//         }
//     };

//     useEffect(() => {
//         if (submitted) {
//             const timer = setTimeout(() => {
//                 setSubmitted(false);
//             }, 3000);
//             return () => clearTimeout(timer);
//         }
//     }, [submitted]);

//     return (
//         <>
//             <div className="relative z-1 flex justify-center items-center min-h-screen px-4 py-8 bg-[#F9FAFB]">
//                 <div className="w-full max-w-4xl bg-white shadow-lg p-8 rounded-lg">
//                     <div className="mb-6 text-center">
//                         <h1 className="font-semibold text-3xl xl:text-4xl mb-4">{t('contact.title')}</h1>
//                     </div>
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label htmlFor="name" className="block mb-1 font-semibold text-lg">Name</label>
//                                 <input
//                                     type="text"
//                                     id="name"
//                                     name="name"
//                                     placeholder="Enter your name"
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     className="w-full p-2.5 rounded bg-[#F1F2F3]"
//                                 />
//                                 {errors.name && <span className="text-red-500 block mt-1">{errors.name}</span>}
//                             </div>
//                             <div>
//                                 <label htmlFor="email" className="block mb-1 font-semibold text-lg">Email</label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     name="email"
//                                     placeholder="Enter e-mail"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     className="w-full p-2.5 rounded bg-[#F1F2F3]"
//                                 />
//                                 {errors.email && <span className="text-red-500 block mt-1">{errors.email}</span>}
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label htmlFor="mobile" className="block mb-1 font-semibold text-lg">Mobile Number</label>
                               
//                                 <PhoneInput
//     country={'in'}
//     value={formData.mobile}
//     onChange={handlePhoneChange}
//     placeholder="Enter Mobile Number"
//     type="number"
//     id="mobile"
//     name="mobile"
//     onBlur={handleBlur}
//     inputStyle={{
//         width: '100%',
//         padding: '20px',
//         paddingLeft: '58px',  
        
//         backgroundColor: '#F1F2F3',
//     }}
// />

//                                 {errors.mobile && <span className="text-red-500 block mt-1">{errors.mobile}</span>}
//                             </div>
//                             <div>
//                                 <label htmlFor="subject" className="block mb-1 font-semibold text-lg">Subject</label>
//                                 <input
//                                     type="text"
//                                     id="subject"
//                                     name="subject"
//                                     placeholder="Enter Subject"
//                                     value={formData.subject}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     className="w-full p-2.5 rounded bg-[#F1F2F3]"
//                                 />
//                                 {errors.subject && <span className="text-red-500 block mt-1">{errors.subject}</span>}
//                             </div>
//                         </div>

//                         <div>
//                             <label htmlFor="message" className="block mb-1 font-semibold text-lg">Message</label>
//                             <textarea
//                                 id="message"
//                                 name="message"
//                                 placeholder="Let us know more about your inquiry"
//                                 value={formData.message}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 className="w-full p-3 rounded bg-[#F1F2F3] resize-vertical h-32"
//                             ></textarea>
//                             {errors.message && <span className="text-red-500 block mt-1">{errors.message}</span>}
//                         </div>

//                         <button
//                             type="submit"
//                             className="w-full md:w-1/3 bg-[#281E5D] text-white py-3 rounded-full font-semibold text-lg mx-auto flex justify-center items-center"
//                         >
//                             Submit
//                         </button>

//                         {submitted && (
//                             <div className="bg-green-200 text-green-800 mt-8 px-4 py-2 mb-4 rounded-md text-center">
//                                 Your request has been submitted successfully!
//                             </div>
//                         )}
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Contact;

//update design
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// aos
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
    const { t } = useTranslation();
    useEffect(() => {
        AOS.init();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handlePhoneChange = (value) => {
        setFormData({
            ...formData,
            mobile: value
        });
        console.log(value);

        if (errors.mobile) {
            setErrors({
                ...errors,
                mobile: ''
            });
            
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        let error = '';

        if (!value) {
            switch (name) {
                case 'name':
                    error = 'Name is required';
                    break;
                case 'email':
                    error = 'Email is required';
                    break;
                case 'mobile':
                    error = 'Your Mobile number is required';
                    break;
                case 'subject':
                    error = 'Subject is required';
                    break;
                case 'message':
                    error = 'Message is required';
                    break;
                default:
                    break;
            }
        }

        setErrors({
            ...errors,
            [name]: error
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.mobile) newErrors.mobile = 'Your Mobile number is required';
        if (!formData.subject) newErrors.subject = 'Subject is required';
        if (!formData.message) newErrors.message = 'Message is required';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contact/contacts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    console.log('Form submitted successfully');
                    setFormData({
                        name: '',
                        email: '',
                        mobile: '',
                        subject: '',
                        message: ''
                    });
                    setErrors({});
                    setSubmitted(true);
                } else {
                    console.error('Error submitting the form');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    useEffect(() => {
        if (submitted) {
            const timer = setTimeout(() => {
                setSubmitted(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [submitted]);

    return (
        <>
            <div className="relative z-1 flex justify-center items-center min-h-screen px-0 py-8 bg-[#F9FAFB]">
                {/* <div className="w-full max-w-4xl bg-white shadow-lg p-8 rounded-lg"> */}
                <div className='w-full max-w-6xl sm:p-4 p-6 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-20'>
                     {/* Left: Contact Form */}
                    {/* <div className="mb-6 text-center">
                        <h1 className="font-semibold text-3xl xl:text-4xl mb-4">{t('contact.title')}</h1>
                    </div> */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h1 className="font-semibold text-2xl xl:text-3xl mb-4">தொடர்பு கொள்ள</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block mb-1 font-semibold text-lg">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full p-2.5 rounded bg-[#F1F2F3]"
                                />
                                {errors.name && <span className="text-red-500 block mt-1">{errors.name}</span>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-1 font-semibold text-lg">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter e-mail"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full p-2.5 rounded bg-[#F1F2F3]"
                                />
                                {errors.email && <span className="text-red-500 block mt-1">{errors.email}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="mobile" className="block mb-1 font-semibold text-lg">Mobile Number</label>
                               
                                <PhoneInput
    country={'in'}
    value={formData.mobile}
    onChange={handlePhoneChange}
    placeholder="Enter Mobile Number"
    type="number"
    id="mobile"
    name="mobile"
    onBlur={handleBlur}
    inputStyle={{
        width: '100%',
        padding: '20px',
        paddingLeft: '58px',  
        
        backgroundColor: '#F1F2F3',
    }}
/>

                                {errors.mobile && <span className="text-red-500 block mt-1">{errors.mobile}</span>}
                            </div>
                            <div>
                                <label htmlFor="subject" className="block mb-1 font-semibold text-lg">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="Enter Subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full p-2.5 rounded bg-[#F1F2F3]"
                                />
                                {errors.subject && <span className="text-red-500 block mt-1">{errors.subject}</span>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="block mb-1 font-semibold text-lg">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Let us know more about your inquiry"
                                value={formData.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full p-3 rounded bg-[#F1F2F3] resize-vertical h-32"
                            ></textarea>
                            {errors.message && <span className="text-red-500 block mt-1">{errors.message}</span>}
                        </div>

                        <button
                            type="submit"
                            className=" bg-[#281E5D] text-[#FFFFFF] text-[#FFFFFF]-700 py-2 px-8 rounded-full font-semibold text-lg mx-auto"
                        >
                            Submit
                        </button>

                        {submitted && (
                            <div className="bg-green-200 text-green-800 mt-8 px-4 py-2 mb-4 rounded-md text-center">
                                Your request has been submitted successfully!
                            </div>
                        )}
                    </form>
                    {/* Right: Content Section */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-xl font-bold text-[#014A8A] mb-4">
                       “{t('contact.quotes')}”     
                    </h2>
                    <p className="text-[#000000] mb-6">
                       {t('contact.quotescontent')}
                    </p>
                    <p className="font-semibold text-right">{t('contact.quotesauthor')}</p>
                </div>
                </div>
            </div>
        </>
    );
};

export default Contact;





