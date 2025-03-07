"use client"
import { useEffect, useState } from "react"
import { getAllPosts } from "../alumni/post";


export function AlumniPosts() {
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(false);

  useEffect(() => {
    setPostLoading(true);
    const fetchPosts = async () => {
      const data = await getAllPosts();
      setPostLoading(false);
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500 mr-2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <h2 className="text-lg font-semibold">Alumni Posts</h2>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {!postLoading ? (
          posts.length > 0 ? (
            posts.map((post) => {
              return (
                <div key={post.id} className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Dynamic Random Color */}
                    <div className={`h-10 w-10 flex justify-center items-center border rounded-full bg-blue -200`}>
                      <h1 className="font-bold">{post.alumni.name[0]}</h1>
                    </div>
                    <div>
                      <h3 className="font-medium capitalize text-xl">{post.title}</h3>
                      <p className="text-xs text-gray-500">{post.alumni.name}</p>
                      <p className="mt-2 text-sm">{post.description}</p>
                      <div className="mt-3 flex items-center gap-4">
                        <button className="flex items-center gap-1 text-xs text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M7 10v12" />
                            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                          </svg>
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-xs text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          <span>{post.comments}</span>
                        </button>
                        <button className="ml-auto flex items-center gap-1 text-xs text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                            <polyline points="16 6 12 2 8 6" />
                            <line x1="12" y1="2" x2="12" y2="15" />
                          </svg>
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No Posts Found</p>
          )
        ) : (
          <p className="text-xl font-semibold text-center mt-2">Loading...</p>
        )}
      </div>
    </div>
  );
}
  