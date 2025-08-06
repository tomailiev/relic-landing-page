import { Link } from "@mui/material";

const ExternalLink = ({ route, children }) => {
    return <Link
        href={route}
        target="_blank"
        color="inherit"
        width={'100%%'}
        style={{
            transition: '0.3s',
            '&:hover': { opacity: 0.95 },
            textDecoration: 'none',
        }}
    >
        {children}
    </Link>
};

export default ExternalLink;