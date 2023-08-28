import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [caption, setCaption] = useState('');
  const [comment, setComment] = useState('');

  const handlePostCreation = () => {
    const newPost = {
      id: posts.length + 1,
      username,
      caption,
      likes: 0,
      comments: [],
    };
    setPosts([...posts, newPost]);
    setUsername('');
    setCaption('');
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleComment = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    );
    setPosts(updatedPosts);
    setComment('');
  };

  const handleDelete = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          placeholder="Caption"
          value={caption}
          onChangeText={(text) => setCaption(text)}
        />
        <TouchableOpacity onPress={handlePostCreation}>
          <Text>Create Post</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text>{item.username}</Text>
            <Text>{item.caption}</Text>
            <Text>Likes: {item.likes}</Text>
            <TouchableOpacity onPress={() => handleLike(item.id)}>
              <Text>Like</Text>
            </TouchableOpacity>
            <Text>Comments:</Text>
            {item.comments.map((comment, index) => (
              <Text key={index}>{comment}</Text>
            ))}
            <TextInput
              placeholder="Add a comment"
              value={comment}
              onChangeText={(text) => setComment(text)}
            />
            <TouchableOpacity onPress={() => handleComment(item.id)}>
              <Text>Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text>Delete Post</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default App;