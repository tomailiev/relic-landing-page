function Seo({ title, description, url }) {
    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            {url && <link rel="canonical" href={url} />}
        </>
    );
}

export default Seo;