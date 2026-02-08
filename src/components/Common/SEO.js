function Seo({ title, description, url }) {
    return (
        <head>
            <title>{title}</title>
            <meta name="description" content={description} />
            {url && <link rel="canonical" href={url} />}
        </head>
    );
}

export default Seo;