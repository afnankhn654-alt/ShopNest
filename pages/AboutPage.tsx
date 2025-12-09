import React from 'react';
import { teamMembers, aboutUsImages } from '../data/mockData';
import { LightbulbIcon, ShieldCheckIcon, UsersIcon, SparklesIcon } from '../components/icons';

const AboutPage: React.FC = () => {
    return (
        <div className="animate-fade-in bg-light-bg dark:bg-dark-bg">
            {/* Hero Section */}
            <div className="relative h-96">
                <img src={aboutUsImages.hero} alt="Our team working together" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white p-4">
                    <h1 className="text-5xl font-bold mb-4 animate-slide-in">About ShopNest</h1>
                    <p className="text-xl max-w-2xl animate-slide-in" style={{ animationDelay: '0.2s' }}>
                        Redefining the art of online shopping through innovation, quality, and a passion for customer delight.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {/* Our Mission Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-primary">Our Mission</h2>
                        <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary mb-4">
                            At ShopNest, our mission is to create a trusted and inspiring e-commerce platform where customers can discover high-quality products that enhance their lifestyle. We are committed to providing a seamless, personalized, and secure shopping experience, powered by cutting-edge technology and exceptional customer service.
                        </p>
                        <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
                            We aim to build a vibrant community of shoppers and sellers, fostering a marketplace that values quality, authenticity, and innovation above all else.
                        </p>
                    </div>
                    <div>
                        <img src={aboutUsImages.mission} alt="Happy customer shopping online" className="rounded-lg shadow-xl" />
                    </div>
                </div>

                {/* Our Values Section */}
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-bold mb-10">Our Core Values</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center">
                            <div className="bg-primary-light p-4 rounded-full mb-4">
                                <UsersIcon className="w-10 h-10 text-primary-dark" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Customer-Centric</h3>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary">Our customers are at the heart of everything we do. We listen, learn, and innovate to meet their needs.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-full mb-4">
                                <ShieldCheckIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Quality & Trust</h3>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary">We stand behind the quality of our products and the security of our platform, building lasting trust.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full mb-4">
                                <LightbulbIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary">We embrace change and leverage AI to constantly improve the shopping experience for everyone.</p>
                        </div>
                         <div className="flex flex-col items-center">
                            <div className="bg-yellow-100 dark:bg-yellow-900/50 p-4 rounded-full mb-4">
                                <SparklesIcon className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary">We strive for excellence in every aspect of our business, from our platform to our customer support.</p>
                        </div>
                    </div>
                </div>

                {/* Meet the Team Section */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-10">Meet the Team</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.name} className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md text-center transform hover:-translate-y-2 transition-transform duration-300">
                                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200 dark:border-secondary" />
                                <h3 className="text-xl font-semibold">{member.name}</h3>
                                <p className="text-primary font-medium mb-2">{member.role}</p>
                                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
