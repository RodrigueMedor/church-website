import React, { useEffect, useState } from 'react';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;
const MAX_RESULTS = 20;

const WatchOnline = () => {
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);

    useEffect(() => {
        fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
        )
            .then(res => res.json())
            .then(data => {
                const now = new Date();
                const oneYearAgo = new Date();
                oneYearAgo.setDate(now.getDate() - 365);

                const videoItems = (data.items || [])
                    .filter(item =>
                        item.id.kind === 'youtube#video' &&
                        new Date(item.snippet.publishedAt) >= oneYearAgo
                    )
                    .sort((a, b) => new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt));

                setVideos(videoItems);
                if (videoItems.length > 0) {
                    setCurrentVideo(videoItems[0].id.videoId);
                }
            })
            .catch(() => {
                setVideos([]);
                setCurrentVideo(null);
            });
    }, []);

    return (
        <div
            className="watch-online-page"
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
                padding: '40px 0'
            }}
        >
            <div
                style={{
                    maxWidth: '1100px',
                    margin: '0 auto',
                    background: 'rgba(255,255,255,0.95)',
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px rgba(60,60,120,0.13)',
                    padding: '40px 28px'
                }}
            >
                <h1
                    style={{
                        fontSize: '2.8rem',
                        fontWeight: 800,
                        color: '#1e293b',
                        marginBottom: '10px',
                        letterSpacing: '-1.5px',
                        textAlign: 'center'
                    }}
                >
                    Watch Online
                </h1>
                <p
                    style={{
                        color: '#64748b',
                        fontSize: '1.15rem',
                        marginBottom: '32px',
                        textAlign: 'center'
                    }}
                >
                    Browse and watch our latest services and videos below.
                </p>
                {currentVideo && (
                    <div
                        className="video-player"
                        style={{
                            marginBottom: '36px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 6px 24px rgba(60,60,120,0.13)',
                            background: '#000',
                            maxWidth: '1200px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                    >
                        <iframe
                            width="100%"
                            height="500"
                            src={`https://www.youtube.com/embed/${currentVideo}`}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="YouTube Video Player"
                            style={{ display: 'block', width: '100%', minHeight: 400 }}
                        />
                    </div>
                )}
                <h2
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#3b82f6',
                        marginBottom: '20px',
                        letterSpacing: '-0.5px',
                        textAlign: 'center'
                    }}
                >
                    All Videos
                </h2>
                <div
                    className="video-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '22px'
                    }}
                >
                    {videos.map((video) => (
                        <div
                            key={video.id.videoId}
                            style={{
                                cursor: 'pointer',
                                background: currentVideo === video.id.videoId
                                    ? 'linear-gradient(90deg, #dbeafe 0%, #f0abfc 100%)'
                                    : '#f8fafc',
                                boxShadow: currentVideo === video.id.videoId
                                    ? '0 4px 16px rgba(139,92,246,0.13)'
                                    : '0 1px 4px rgba(60,60,120,0.07)',
                                padding: '0 0 16px 0',
                                borderRadius: '14px',
                                border: currentVideo === video.id.videoId
                                    ? '2px solid #818cf8'
                                    : '2px solid transparent',
                                transition: 'background 0.2s, box-shadow 0.2s, border 0.2s',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onClick={() => setCurrentVideo(video.id.videoId)}
                        >
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={video.snippet.thumbnails.high.url}
                                    alt={video.snippet.title}
                                    style={{
                                        width: '100%',
                                        height: '160px',
                                        objectFit: 'cover',
                                        borderTopLeftRadius: '14px',
                                        borderTopRightRadius: '14px',
                                        filter: currentVideo === video.id.videoId ? 'brightness(0.95)' : 'brightness(0.85)',
                                        transition: 'filter 0.2s'
                                    }}
                                />
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        background: 'rgba(0,0,0,0.45)',
                                        borderRadius: '50%',
                                        width: 48,
                                        height: 48,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </span>
                            </div>
                            <div
                                style={{
                                    fontWeight: 600,
                                    color: '#334155',
                                    fontSize: '1.08rem',
                                    lineHeight: '1.3',
                                    margin: '14px 14px 0 14px',
                                    minHeight: 48,
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap'
                                }}
                                title={video.snippet.title}
                            >
                                {video.snippet.title}
                            </div>
                            <div
                                style={{
                                    color: '#64748b',
                                    fontSize: '0.95rem',
                                    margin: '6px 14px 0 14px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                {new Date(video.snippet.publishedAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WatchOnline;