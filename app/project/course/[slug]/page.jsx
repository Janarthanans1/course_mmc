const Course = async ({ params }) => {
    const { slug } = await params; // Extract `slug` from `params`
    return (
        <h1>jana : {slug}</h1>
    );
};

export default Course;
