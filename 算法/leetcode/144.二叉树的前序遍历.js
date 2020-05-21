/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    let result = [];
    // if(!root){return }
    let  preorderlist = (node)=>{
        if(node){
            result.push(node.val);
            preorderlist(node.left);
            preorderlist(node.right);
        }

    }
    preorderlist(root)
    return result
};
// @lc code=end

