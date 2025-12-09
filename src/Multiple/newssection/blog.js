import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../../service/apiservice';
import { useTranslation } from 'react-i18next';
import { Allapi } from '../../constant/constantApi';
import Header from '../../header/header';

const Blog = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchAllNews = async (lang) => {
      try {
        // const response = await get(`api/news/news?lang=${lang}`);
        const response = await get(`${Allapi.NEWS_getapi}?lang=${lang}`);
        setNewsItems(response.data.data);
      } catch (error) {
        console.error('Failed to fetch news data:', error);
      }
    };

    fetchAllNews(i18n.language);
  }, [i18n.language]);

  
  const filteredPosts = newsItems.filter(post => {
    const title = i18n.language === 'TA' ? post.title_ta : post.title_en;
    return title && title.toLowerCase().includes(searchTerm.toLowerCase()) && post.isDisabled;
  });

  

  const handleReadMore = (post) => {
    navigate('/readmorenews', { state: { newsItem: post } });
  };

  return (
    <>
     
      <Header/>
      <div className="bg-gray-100 pt-28 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">{t('blog.title')}</h1>
          <div className="flex justify-center items-center mb-8">
            <div className="relative flex w-full max-w-lg">
              <input
                type="text"
                className="border border-gray-300 pl-4 pr-10 py-2 w-full"
                placeholder="Search All Blog Posts"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              {/* <button className="bg-blue-500 text-white px-4">Find</button> */}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {filteredPosts.filter(event => event.isDisabled).map((post) => (
                <div key={post.id} className="mb-8 w-full max-w-xl h-auto mx-auto">
                  <h2 className="text-2xl font-semibold mb-2">{i18n.language === 'TA' ? post.title_ta:post.title_en}</h2>
                  <div className="mb-6">
                    <img
                      src={post.image.startsWith('http') ? post.image : `${process.env.REACT_APP_API_URL}/public/${post.image}`} 
                      alt={post.title_ta}
                      className="w-full max-w-xl h-auto rounded mx-auto"
                      style={{ maxHeight: '300px', objectFit: 'cover' }}
                    />
                  </div>
                  <p className="text-sm mt-8 text-start leading-[1.8rem] news-content:text-2xl">
                    {/* {post.description_ta.substring(0, 160)}... */}
                    {i18n.language === 'TA'
                      ? `${post.description_ta?.substring(0, 160) ?? ''}...`
                        : `${post.description_en?.substring(0, 160) ?? ''}...`}
                    <button
                    onClick={() => handleReadMore(post)}
                    className="text-blue-500"
                  >
                   {t('purpose.readMore')}
                  </button>
                  </p>
                  
                  
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;




