const usersResolvers = require('./users');
const postsResolvers = require('./posts');
const commentsResolvers = require('./comments');

module.exports = {
  // about 'Post' modifier: if we send any type of query or mutation or subscription that returns a Post, it will have to go through this modifier and add these two properties ('likeCount' and 'commentCount').
  Post: {
    likeCount: parent => {
      // console.log('parent', parent); // 'parent' is actually the Post that's been sent.
      return parent.likes.length;
    },
    commentCount: parent => parent.comments.length
  },
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation
  }
  // 'Subscription' part
  /*
  Subscription: {
    ...postsResolvers.Subscription
  }
  */
};
