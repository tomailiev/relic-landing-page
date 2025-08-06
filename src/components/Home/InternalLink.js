import { Link } from "react-router-dom"

const InternalLink = ({ route, children }) => {
    return <Link
        to={route}
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

export default InternalLink;