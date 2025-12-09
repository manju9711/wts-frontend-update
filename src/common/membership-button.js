import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const Membershipbutton = () => {
    const { t, i18n } = useTranslation();
    return (
        <>
           <Link to="/membership"> <button className="bg-blue-950 text-white w-full md:w-64 py-3 rounded-full font-semibold text-sm mb-4 nokkam-button-text:text-lg">
           {t('purpose.membershipRegistration')}<i className="fa fa-arrow-right text-white pl-2" aria-hidden="true"></i>
            </button></Link>
        </>
    );
}
export default Membershipbutton;