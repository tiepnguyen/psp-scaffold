const posts = [
  {
    id: '1',
    title: 'The Great Gatsby',
    status: 'PUBLISHED',
    // createdDate: new Date('1925-04-10'),
    createdDate: '1925-04-10',
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    status: 'DRAFT',
    createdDate: '1960-07-11',
  },
  {
    id: '3',
    title: '1984',
    status: 'ARCHIVED',
    createdDate: '1949-06-08',
  },
]

export async function getPosts() {
  return posts
}

export async function getPostById(id: string) {
  return posts.find((post) => post.id === id)
}
