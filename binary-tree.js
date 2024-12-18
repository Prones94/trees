/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return null
    if (node.left === null && node.right === null) return 1
    if (node.left === null) return (1 + this.minDepth(node.right))
    if (node.right === null) return (1 + this.minDepth(node.left))
    return 1 + Math.min(this.minDepth(node.left), this.minDepth(node.right))

  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return null
    return 1 + Math.max(this.maxDepth(node.left), this.maxDepth(node.right))
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let maxSum = -Infinity

    function findMaxPathSum(node){
      if (!node) return 0
      let leftSum = Math.max(0, findMaxPathSum(node.left))
      let rightSum = Math.max(0, findMaxPathSum(node.right))

      maxSum = Math.max(maxSum, node.val + leftSum + rightSum)

      return node.val + Math.max(leftSum, rightSum)
    }
    findMaxPathSum(this.root)
    return maxSum
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null
    let result = null
    function traverse(node){
      if (!node) return
      if (node.val > lowerBound){
        if (result === null || node.val < result){
          result = node.val
        }
      }
      traverse(node.left)
      traverse(node.right)
    }
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!root || node1 === root || node2 === root) return false
    function findParentandLevel(node,target, level){
      if (node === null) return [null, -1]
      if (node.left === target || node.right === target){
        return [node, level + 1]
      }
      return (findParentandLevel(node.left, target, level + 1) || findParentandLevel(node.right, target, level + 1))
    }
    const [parent1, level1] = findParentandLevel(this.root, node1, 0)
    const [parent2, level2] = findParentandLevel(this.root, node2, 0)
    return level1 === level2 && parent1 !== parent2
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(node = this.root) {
    if(!node) return "null"
    const leftSerialized = this.serialize(node.left)
    const rightSerialized = this.serialize(node.right)

    return `[${node.val},${leftSerialized},${rightSerialized}]`
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(data) {
    const dataArray = JSON.parse(data)
    let index = 0

    function buildTree(){
      if (dataArray[index] === "null"){
        index++
        return null
      }
      const node = new BinaryTreeNode(parseInt(data[index]))
      index++
      node.left = buildTree()
      node.right = buildTree()
      return node
    }

    return buildTree()
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    if (!this.node || node === node1 || node === node2) return node
    const left = this.lowestCommonAncestor(node.left, node1, node2)
    const right = this.lowestCommonAncestor(node.right, node1, node2)

    if (left && right ) return node
    return left || right
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
