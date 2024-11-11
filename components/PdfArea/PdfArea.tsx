import React from 'react';
import styles from './PdfArea.module.css';
import { FaBookmark, FaDownload } from 'react-icons/fa';

export default function PdfArea() {
    return (
        <div className={styles.container}>
            <div className={styles.pdfContainer}>
                {/* Title Container with Title and Bookmark Icon */}
                <div className={styles.titleContainer}>
                    <span className={styles.title}>Data Structures and Algorithms (DSA) Notes</span>
                    <div className={styles.iconContainer}>
                        <FaBookmark className={styles.bookmarkIcon} />
                        <FaDownload className={styles.bookmarkIcon} />
                    </div>

                </div>

                {/* Text Container with Typography Examples */}
                <div className={styles.textContainer}>
                    {/* <h1 className={styles.heading}>Introduction to Data Structures and Algorithms</h1>
                    <p className={styles.paragraph}>
                        Data Structures and Algorithms (DSA) are fundamental concepts in computer science that every programmer should learn.
                        They form the basis for solving complex problems efficiently. In this section, we will cover various data structures like arrays, linked lists, stacks, queues,
                        trees, and graphs, along with algorithms to manipulate these structures.
                    </p>

                    <h2 className={styles.subHeading}>Types of Data Structures</h2>
                    <p className={styles.paragraph}>
                        A data structure is a particular way of organizing data in the computer so that it can be used more effectively. The most common types of data structures are:
                    </p>
                    <ul>
                        <li>Arrays</li>
                        <li>Linked Lists</li>
                        <li>Stacks</li>
                        <li>Queues</li>
                        <li>Trees</li>
                        <li>Graphs</li>
                    </ul>

                    <h3 className={styles.subSubHeading}>Arrays</h3>
                    <p className={styles.paragraph}>
                        An array is a collection of elements identified by index or key. All elements are of the same type and stored contiguously in memory.
                        Arrays are the most basic data structure, and they provide constant-time access to elements.
                    </p>
                    <p className={styles.paragraph}>
                        Example of array operations:
                    </p>
                    <div className={styles.codeContainer}>
                        <pre>
                            <code className={styles.code}>
                                {'const arr = [1, 2, 3, 4, 5]; // Array initialization\n'}
                                {'console.log(arr[2]); // Accessing element at index 2\n'}
                                {'arr.push(6); // Adding an element at the end\n'}
                                {'arr.pop(); // Removing the last element'}
                            </code>
                        </pre>
                    </div>

                    <h3 className={styles.subSubHeading}>Linked Lists</h3>
                    <p className={styles.paragraph}>
                        A linked list is a linear data structure where each element (node) points to the next. Unlike arrays, linked lists do not require contiguous memory allocation.
                    </p>
                    <p className={styles.paragraph}>
                        In a singly linked list, each node has a data part and a reference (link) to the next node. The last node points to `null`, indicating the end of the list.
                    </p>
                    <div className={styles.codeContainer}>
                        <pre>
                            <code className={styles.code}>
                                {'class Node {'} <br />
                                {'  constructor(data) {'} <br />
                                {'    this.data = data;'} <br />
                                {'    this.next = null;'} <br />
                                {'  }'} <br />
                                {'}'} <br />
                                <br />
                                {'class LinkedList {'} <br />
                                {'  constructor() {'} <br />
                                {'    this.head = null;'} <br />
                                {'  }'} <br />
                                {'  insertFirst(data) {'} <br />
                                {'    const newNode = new Node(data);'} <br />
                                {'    newNode.next = this.head;'} <br />
                                {'    this.head = newNode;'} <br />
                                {'  }'} <br />
                                {'}'} <br />
                            </code>
                        </pre>
                    </div>

                    <h3 className={styles.subSubHeading}>Stacks</h3>
                    <p className={styles.paragraph}>
                        A stack is a linear data structure that follows the Last In First Out (LIFO) principle.
                        Elements are added to the top and removed from the top.
                    </p>
                    <p className={styles.paragraph}>
                        Common operations in stacks include `push` (adding an element), `pop` (removing an element), and `peek` (viewing the top element).
                    </p>
                    <div className={styles.codeContainer}>
                        <pre>
                            <code className={styles.code}>
                                {'class Stack {'} <br />
                                {'  constructor() {'} <br />
                                {'    this.items = [];'} <br />
                                {'  }'} <br />
                                {'  push(element) {'} <br />
                                {'    this.items.push(element);'} <br />
                                {'  }'} <br />
                                {'  pop() {'} <br />
                                {'    return this.items.pop();'} <br />
                                {'  }'} <br />
                                {'  peek() {'} <br />
                                {'    return this.items[this.items.length - 1];'} <br />
                                {'  }'} <br />
                                {'}'} <br />
                            </code>
                        </pre>
                    </div>

                    <h3 className={styles.subSubHeading}>Queues</h3>
                    <p className={styles.paragraph}>
                        A queue is a linear data structure that follows the First In First Out (FIFO) principle.
                        Elements are added at the rear and removed from the front.
                    </p>
                    <p className={styles.paragraph}>
                        Common operations in queues include `enqueue` (adding an element) and `dequeue` (removing an element).
                    </p>
                    <div className={styles.codeContainer}>
                        <pre>
                            <code className={styles.code}>
                                {'class Queue {'} <br />
                                {'  constructor() {'} <br />
                                {'    this.items = [];'} <br />
                                {'  }'} <br />
                                {'  enqueue(element) {'} <br />
                                {'    this.items.push(element);'} <br />
                                {'  }'} <br />
                                {'  dequeue() {'} <br />
                                {'    return this.items.shift();'} <br />
                                {'  }'} <br />
                                {'  peek() {'} <br />
                                {'    return this.items[0];'} <br />
                                {'  }'} <br />
                                {'}'} <br />
                            </code>
                        </pre>
                    </div>

                    <h3 className={styles.subSubHeading}>Trees</h3>
                    <p className={styles.paragraph}>
                        A tree is a hierarchical data structure consisting of nodes, where each node points to child nodes.
                        The root node is the topmost node, and all other nodes are its descendants.
                    </p>
                    <p className={styles.paragraph}>
                        The most common type of tree is the binary tree, where each node has at most two children: left and right.
                    </p>
                    <div className={styles.codeContainer}>
                        <pre>
                            <code className={styles.code}>
                                {'class TreeNode {'} <br />
                                {'  constructor(value) {'} <br />
                                {'    this.value = value;'} <br />
                                {'    this.left = null;'} <br />
                                {'    this.right = null;'} <br />
                                {'  }'} <br />
                                {'}'} <br />
                                <br />
                                {'class BinaryTree {'} <br />
                                {'  constructor() {'} <br />
                                {'    this.root = null;'} <br />
                                {'  }'} <br />
                                {'  insert(value) {'} <br />
                                {'    const newNode = new TreeNode(value);'} <br />
                                {'    if (this.root === null) {'} <br />
                                {'      this.root = newNode;'} <br />
                                {'    } else {'} <br />
                                {'      this._insertRecursively(this.root, newNode);'} <br />
                                {'    }'} <br />
                                {'  }'} <br />
                                {'  _insertRecursively(node, newNode) {'} <br />
                                {'    if (newNode.value < node.value) {'} <br />
                                {'      if (node.left === null) node.left = newNode;'} <br />
                                {'      else this._insertRecursively(node.left, newNode);'} <br />
                                {'    } else {'} <br />
                                {'      if (node.right === null) node.right = newNode;'} <br />
                                {'      else this._insertRecursively(node.right, newNode);'} <br />
                                {'    }'} <br />
                                {'  }'} <br />
                                {'}'} <br />
                            </code>
                        </pre>
                    </div>

                    <h2 className={styles.subHeading}>Sorting Algorithms</h2>
                    <p className={styles.paragraph}>
                        Sorting is the process of arranging elements in a specific order. Common sorting algorithms include:
                    </p>
                    <ul>
                        <li>Bubble Sort</li>
                        <li>Merge Sort</li>
                        <li>Quick Sort</li>
                        <li>Insertion Sort</li>
                    </ul>

                    <p className={styles.paragraph}>
                        Example of Bubble Sort:
                    </p>
                    <div className={styles.codeContainer}>
                        <pre>
                            <code className={styles.code}>
                                {'function bubbleSort(arr) {'} <br />
                                {'  do {'} <br />
                                {'    swapped = false;'} <br />
                                {'    for (let i = 0; i < arr.length - 1; i++) {'} <br />
                                {'      if (arr[i] > arr[i + 1]) {'} <br />
                                {'        let temp = arr[i];'} <br />
                                {'        arr[i] = arr[i + 1];'} <br />
                                {'        arr[i + 1] = temp;'} <br />
                                {'        swapped = true;'} <br />
                                {'      }'} <br />
                                {'    }'} <br />
                                {'  } while (swapped);'} <br />
                                {'}'} <br />
                            </code>
                        </pre>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
