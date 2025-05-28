import CardList from '../components/posts/CardList';
import ViewUserButton from '../components/posts/ViewUserButton';

const base_url = 'https://jsonplaceholder.typicode.com/posts';

interface Iposts {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const Posts = async() => {
    const response = await fetch(base_url, {
        // cache: 'no-store',
        next: {
            revalidate: 10, 
        },
    });
    const posts: Iposts[] = await response.json();

    return (
        <>
        <p>{new Date().toLocaleTimeString()}</p>
            <h1 className="text-fuchsia-500">POSTINGAN PAGE</h1>     
            {posts.map((post) => {
                return (
                    <CardList key={post.id}>
                        <p>{post.id}</p>
                        <i>{post.title}</i>
                        <p>{post.body}</p>
                        <ViewUserButton userId={post.userId}/>
                    </CardList>
                );
            })}  
        </>
    );
}
export default Posts;