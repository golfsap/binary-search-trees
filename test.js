const Tree = require("./tree");

function generateRandomNum(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(Math.floor(Math.random() * 101));
  }
  return arr;
}

const numbers = generateRandomNum(20);
const test = Tree(numbers);

test.prettyPrint(test.getRoot());
console.log(test.isBalanced());

// Print out elements in level-order:
test.levelOrder((a) => console.log(a.data));
// preorder:
test.preOrder(test.getRoot(), (a) => console.log(a.data));
// postorder:
test.postOrder(test.getRoot(), (a) => console.log(a.data));
// inorder:
test.inOrder(test.getRoot(), (a) => console.log(a.data));

// Unbalance tree
test.insert(110);
test.insert(111);
test.prettyPrint(test.getRoot());
console.log(test.isBalanced());

// Rebalance tree
test.rebalance();
test.prettyPrint(test.getRoot());
console.log(test.isBalanced());
