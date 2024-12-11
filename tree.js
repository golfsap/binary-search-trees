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
          } else if (previousNode.left === currentNode) {
            previousNode.left = null;
          } else {
            previousNode.right = null;
          }
        }
        // Case 2: One child node (either left or right)
        else if (currentNode.left === null || currentNode.right === null) {
          let childNode =
            currentNode.left === null ? currentNode.right : currentNode.left;
          if (previousNode === null) {
            root = childNode;
          } else if (previousNode.left === currentNode) {
            previousNode.left = childNode;
          } else {
            previousNode.right = childNode;
          }
        }
        // Case 3: Two children nodes - find inorder successor
        else {
          let successorParent = currentNode;
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
        return true;
      }
      // Continue searching
      previousNode = currentNode;
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return false;
  }

  function find(value) {
    let currentNode = root;
    while (currentNode != null) {
      if (currentNode.data === value) {
        return currentNode;
      }
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  function levelOrder(callback) {
    if (!callback) {
      throw new Error("Callback function required.");
    }

    if (root === null) return;

    const queue = [root]; // Initialize the queue with the root node
    while (queue.length > 0) {
      let currentNode = queue.shift(); // Dequeue the first node from the queue
      callback(currentNode);
      // Enqueue the left and right children (if they exist)
      if (currentNode.left != null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right != null) {
        queue.push(currentNode.right);
      }
    }
  }

  function inOrder(node, callback) {
    if (!callback) {
      throw new Error("Callback function required.");
    }

    if (node != null) {
      inOrder(node.left, callback);
      callback(node);
      inOrder(node.right, callback);
    }
  }

  function preOrder(node, callback) {
    if (!callback) {
      throw new Error("Callback function required.");
    }

    if (node != null) {
      callback(node);
      preOrder(node.left, callback);
      preOrder(node.right, callback);
    }
  }

  function postOrder(node, callback) {
    if (!callback) {
      throw new Error("Callback function required.");
    }

    if (node != null) {
      postOrder(node.left, callback);
      postOrder(node.right, callback);
      callback(node);
    }
  }

  function height(node) {
    if (node === null) {
      return -1;
    }

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  function depth(node) {
    let currentNode = root;
    let depth = 0;

    while (currentNode != null) {
      if (currentNode === node) {
        return depth;
      }
      if (currentNode.data > node.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
      depth++;
    }
    // Did not find node?
    return -1;
  }

  function isBalanced() {
    function checkHeight(node) {
      if (node === null) {
        return 0;
      }
      const leftSubtreeHeight = checkHeight(node.left);
      if (leftSubtreeHeight === -1) return -1;

      const rightSubtreeHeight = checkHeight(node.right);
      if (rightSubtreeHeight === -1) return -1;

      if (Math.abs(leftSubtreeHeight - rightSubtreeHeight) > 1) {
        return -1;
      }

      return Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1;
    }

    return checkHeight(root) !== -1;
  }

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      //   console.log("Encountered undefined or null node");
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

  return {
    root,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    prettyPrint,
  };
}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const test = Tree(arr);

test.prettyPrint(test.root);
// console.log(test.deleteItem(8));
// test.prettyPrint(test.root);
// console.log(test.root);

// test.postOrder(test.root, (a) => console.log(a.data));
test.insert(11);
test.insert(10);
test.deleteItem(11);
// console.log(test.root);

// test.insert(13);
// test.insert(14);
test.prettyPrint(test.root);
// const node = test.find(11);
// console.log(node);
console.log(test.isBalanced());
