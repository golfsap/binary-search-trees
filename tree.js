function Node(value) {
  return { data: value, left: null, right: null };
}

function Tree(arr) {
  // first, remove duplicates then sort the array
  arr = [...new Set(arr)];
  arr.sort((a, b) => a - b);
  //   console.log(arr[5]);

  let root = buildTree(arr, 0, arr.length - 1);

  function buildTree(array, start, end) {
    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    const root = Node(array[mid]);

    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);
    return root;
  }

  function insert(value) {
    let currentNode = root;
    let previousNode = null;
    while (currentNode != null) {
      if (currentNode.data === value) return;
      previousNode = currentNode;
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    const newNode = Node(value);
    if (value < previousNode.data) {
      previousNode.left = newNode;
    } else {
      previousNode.right = newNode;
    }
  }

  function deleteItem(value) {
    let currentNode = root;
    let previousNode = null;
    while (currentNode != null) {
      if (currentNode.data === value) {
        // Case 1: Lead node (no children)
        if (currentNode.left === null && currentNode.right === null) {
          if (previousNode === null) {
            root = null; // If root is the only node
            return;
          } else if (previousNode.left === currentNode) {
            previousNode.left = null;
            return;
          }
          previousNode.right = null;
          return;
        }
        // Case 2: One child node (either left or right)
        else if (currentNode.left === null || currentNode.right === null) {
          let childNode =
            currentNode.left === null ? currentNode.right : currentNode.left;
          if (previousNode === null) {
            root = childNode;
          } else if (previousNode.data > childNode.data) {
            previousNode.left = childNode;
            return;
          }
          previousNode.right = childNode;
          return;
        }
        // Case 3: Two children nodes - find inorder successor
        let successorParent = null;
        let successor = currentNode.right;

        // Keep going left to find the leftmost node
        while (successor.left != null) {
          successorParent = successor;
          successor = successor.left;
        }
        currentNode.data = successor.data;
        if (successorParent !== currentNode) {
          successorParent.left = successor.right;
        } else {
          currentNode.right = successor.right;
        }
      }
      return;
    }
    // Continue searching
    previousNode = currentNode;
    if (value < currentNode.data) {
      currentNode = currentNode.left;
    } else {
      currentNode = currentNode.right;
    }
  }

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  return { root, insert, prettyPrint };
}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const test = Tree(arr);

test.prettyPrint(test.root);
