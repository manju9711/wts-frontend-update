import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../service/apiservice';
import { useTranslation } from 'react-i18next';
import { Allapi } from '../constant/constantApi';
import Header from '../header/header';

const AllNews = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const fetchAllNews = async (lang) => {
            try {
                // const response = await get(`/api/news/news?lang=${lang}`);
                const response = await get(`${Allapi.NEWS_getapi}?lang=${lang}`);
                setNewsItems(response.data.data);
                setFilteredNews(response.data.data);
            } catch (error) {
                console.error('Failed to fetch news data:', error);
            }
        };

        fetchAllNews(i18n.language);
    }, [i18n.language]);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        
        const filtered = newsItems.filter(item => {
            const title = i18n.language === 'TA' ? item.title_ta : item.title_en;
            const description = i18n.language === 'TA' ? item.description_ta : item.description_en;
            return title.toLowerCase().includes(term.toLowerCase()) || description.toLowerCase().includes(term.toLowerCase());
        });
        setFilteredNews(filtered);
    };

    const handleReadMore = (item) => {
        navigate('/readmorenews', { state: { newsItem: item } });
    };

    return (
        <>
        
        <Header/>
        <div className="pt-24 pb-8 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">{t('news.allnews')}</h1>
                <input
                    type="text"
                    placeholder="Search News..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="space-y-8 max-w-7xl mx-auto">
                {filteredNews.filter(event => event.isDisabled).map(item => (
                    <div key={item._id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row items-center">
                        <div className="sm:w-2/3 p-4">
                            <h3 className="text-xl font-semibold mb-2">{i18n.language === 'TA' ? item.title_ta:item.title_en}</h3>
                           
                                <p className="text-sm mt-8 text-start leading-[1.8rem] news-content:text-2xl">
                                {/* {item.description_ta.substring(0, 160)}... */}
                                {i18n.language === 'TA'
                                                                ? `${item.description_ta?.substring(0, 160) ?? ''}...`
                                                                : `${item.description_en?.substring(0, 160) ?? ''}...`}
                                </p>
                            <button
                                onClick={() => handleReadMore(item)}
                                className="text-white bg-blue-950 px-4 py-2 rounded-full hover:bg-indigo-700 transition"
                            >
                                {t('purpose.readMore')}
                            </button>
                        </div>
                        <div className="sm:w-1/3 p-4">
                            <img
                                src={item.image.startsWith('http') ? item.image : `${process.env.REACT_APP_API_URL}/public/${item.image}`}
                                alt={item.title_ta}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default AllNews;
