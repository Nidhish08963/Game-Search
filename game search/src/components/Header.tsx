
interface Props{
    heading:string;
}


function Heading({heading}: Props) {

    return (
        <h1 
            className="mb-4"
            style={{
                background: 'linear-gradient(to right, var(--blue-700), var(--blue-500))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800,
                letterSpacing: '-0.5px'
            }}
        >
            {heading}
        </h1>
    );
}

export default Heading;
