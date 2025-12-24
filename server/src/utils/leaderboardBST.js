class TreeNode {
    constructor(user) {
      this.user = user
      this.left = null
      this.right = null
    }
  }
  
  export class LeaderboardBST {
    constructor() {
      this.root = null
    }
  
    insert(user) {
      const newNode = new TreeNode(user)
  
      if (!this.root) {
        this.root = newNode
        return
      }
  
      let current = this.root
  
      while (true) {
        if (user.score < current.user.score) {
          if (!current.left) {
            current.left = newNode
            return
          }
          current = current.left
        } else {
          if (!current.right) {
            current.right = newNode
            return
          }
          current = current.right
        }
      }
    }
  
    inorderTraversal(node = this.root, result = []) {
      if (!node) return result
  
      this.inorderTraversal(node.left, result)
      result.push(node.user)
      this.inorderTraversal(node.right, result)
  
      return result
    }
  
    searchByUsername(username, node = this.root) {
      if (!node) return null
      if (node.user.username === username) return node.user
  
      return (
        this.searchByUsername(username, node.left) ||
        this.searchByUsername(username, node.right)
      )
    }
  }
  