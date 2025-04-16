import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Object containing course-wise videos
const courseVideosData = {
  python: [
    { id: 1, title: "Python Variables and Data Types", url: "https://www.youtube.com/embed/kLZuut1fYzQ" },
  { id: 2, title: "Python Conditional Statements (if-else)", url: "https://www.youtube.com/embed/DZwmZ8Usvnk" },
  { id: 3, title: "Python Loops (for, while)", url: "https://www.youtube.com/embed/6iF8Xb7Z3wQ" },
  { id: 4, title: "Python Functions and Scope", url: "https://www.youtube.com/embed/9Os0o3wzS_I" },
  { id: 5, title: "Python Lists and Tuples", url: "https://www.youtube.com/embed/W8KRzm-HUcc" },
  { id: 6, title: "Python Dictionaries", url: "https://www.youtube.com/embed/daefaLgNkw0" },
  { id: 7, title: "Python Sets and Frozen Sets", url: "https://www.youtube.com/embed/sBvaPopWOmQ" },
  { id: 8, title: "Python String Manipulation", url: "https://www.youtube.com/embed/5p4Y-MCp5bE" },
  { id: 9, title: "Python File Handling (Read/Write)", url: "https://www.youtube.com/embed/Uh2ebFW8OYM" },
  { id: 10, title: "Python Exception Handling", url: "https://www.youtube.com/embed/MMPHjkdGysM" },
  { id: 11, title: "Python Object-Oriented Programming (OOP)", url: "https://www.youtube.com/embed/JeznW_7DlB0" },
  { id: 12, title: "Python Modules and Packages", url: "https://www.youtube.com/embed/A47wVfCmLXk" },
  { id: 13, title: "Python Lambda Functions", url: "https://www.youtube.com/embed/hYzwCsKGRrg" },
  { id: 14, title: "Python Map, Filter, and Reduce", url: "https://www.youtube.com/embed/hUes6y2b--0" },
  { id: 15, title: "Python List Comprehensions", url: "https://www.youtube.com/embed/5K08WcjGV6c" },
  { id: 16, title: "Python Generators and Iterators", url: "https://www.youtube.com/embed/bD05uGo_sVI" },
  { id: 17, title: "Python Regular Expressions (Regex)", url: "https://www.youtube.com/embed/K8L6KVGG-7o" },
  { id: 18, title: "Python Threading and Multiprocessing", url: "https://www.youtube.com/embed/IEEhzQoKtQU" },
  { id: 19, title: "Python Database Connectivity (SQLite)", url: "https://www.youtube.com/embed/pd-0G0MigUA" },
  { id: 20, title: "Python Web Scraping with BeautifulSoup", url: "https://www.youtube.com/embed/XVv6mJpFOb0" },
  { id: 21, title: "Python JSON Handling", url: "https://www.youtube.com/embed/h059X6hYxYg" },
  { id: 22, title: "Python Logging Module", url: "https://www.youtube.com/embed/UlFJv7YBlRs" },
  { id: 23, title: "Python Virtual Environments", url: "https://www.youtube.com/embed/Kg1Yvry_Ydk" },
  { id: 24, title: "Python Unit Testing", url: "https://www.youtube.com/embed/6tNS--WetLI" },
  { id: 25, title: "Python REST API with Flask", url: "https://www.youtube.com/embed/mxRJ0OHiQ8A" },
],
  java: [
    { id: 1, title: "Java Basics - Variables and Data Types", url: "https://www.youtube.com/embed/eIrMbAQSU34" },
    { id: 2, title: "Java Operators & Expressions", url: "https://www.youtube.com/embed/bWxGBQ3cUKE" },
    { id: 3, title: "Java Control Statements (if-else, switch)", url: "https://www.youtube.com/embed/BGTx91t8q50" },
    { id: 4, title: "Java Loops (for, while, do-while)", url: "https://www.youtube.com/embed/eUCYA2s06Ew" },
    { id: 5, title: "Java Arrays & ArrayList", url: "https://www.youtube.com/embed/Xi0vhLuP0Tg" },
    { id: 6, title: "Java Methods and Scope", url: "https://www.youtube.com/embed/m8HdD6ODehI" },
    { id: 7, title: "Java String Handling", url: "https://www.youtube.com/embed/WANPsV7GHs8" },
    { id: 8, title: "Java OOP - Classes and Objects", url: "https://www.youtube.com/embed/EgnJ4y1wSO8" },
    { id: 9, title: "Java Inheritance and Polymorphism", url: "https://www.youtube.com/embed/0sI1dR4H3To" },
    { id: 10, title: "Java Abstract Classes & Interfaces", url: "https://www.youtube.com/embed/mwZ7bXIj0i8" },
    { id: 11, title: "Java Exception Handling", url: "https://www.youtube.com/embed/37XW4s8CFRU" },
    { id: 12, title: "Java File Handling", url: "https://www.youtube.com/embed/XVmz6sK5EYg" },
    { id: 13, title: "Java Collections Framework", url: "https://www.youtube.com/embed/5WbJD-LI_sU" },
    { id: 14, title: "Java Multithreading & Concurrency", url: "https://www.youtube.com/embed/yTdlun2LZnw" },
    { id: 15, title: "Java Lambda Expressions", url: "https://www.youtube.com/embed/t88Xri6GLNY" },
    { id: 16, title: "Java Stream API", url: "https://www.youtube.com/embed/t1-YZ6bF-g0" },
    { id: 17, title: "Java Regular Expressions (Regex)", url: "https://www.youtube.com/embed/j1w-K7fI4aQ" },
    { id: 18, title: "Java JDBC - Database Connectivity", url: "https://www.youtube.com/embed/BCmC60p_Wls" },
    { id: 19, title: "Java Networking - Sockets & HTTP", url: "https://www.youtube.com/embed/D5DJ_BVbvcw" },
    { id: 20, title: "Java JSON Handling", url: "https://www.youtube.com/embed/KgyUlrPvxAk" },
    { id: 21, title: "Java Annotations", url: "https://www.youtube.com/embed/ADa4xALYtPE" },
    { id: 22, title: "Java Reflection API", url: "https://www.youtube.com/embed/WAqPz6P2GVk" },
    { id: 23, title: "Java Spring Boot Basics", url: "https://www.youtube.com/embed/-sJDJG3pzHA" },
    { id: 24, title: "Java Servlets & JSP", url: "https://www.youtube.com/embed/fyFpq2G9i88" },
    { id: 25, title: "Java REST API with Spring Boot", url: "https://www.youtube.com/embed/-fxcNY40RHE" },
  ],

  web: [
    { id: 1, title: "Introduction to Web Development", url: "https://www.youtube.com/embed/0pThnRneDjw" },
    { id: 2, title: "HTML Basics", url: "https://www.youtube.com/embed/qz0aGYrrlhU" },
    { id: 3, title: "CSS Fundamentals", url: "https://www.youtube.com/embed/yfoY53QXEnI" },
    { id: 4, title: "CSS Flexbox Explained", url: "https://www.youtube.com/embed/fYq5PXgSsbE" },
    { id: 5, title: "CSS Grid Layout", url: "https://www.youtube.com/embed/0xMQfnTU6oo" },
    { id: 6, title: "JavaScript Basics", url: "https://www.youtube.com/embed/PkZNo7MFNFg" },
    { id: 7, title: "DOM Manipulation in JavaScript", url: "https://www.youtube.com/embed/5fb2aPlgoys" },
    { id: 8, title: "ES6 Features in JavaScript", url: "https://www.youtube.com/embed/NCwa_xi0Uuc" },
    { id: 9, title: "Async JavaScript & Fetch API", url: "https://www.youtube.com/embed/Oive66jrwBs" },
    { id: 10, title: "Introduction to React.js", url: "https://www.youtube.com/embed/bMknfKXIFA8" },
    { id: 11, title: "React State and Props", url: "https://www.youtube.com/embed/5Y6wz4IsUOE" },
    { id: 12, title: "React Hooks - useState & useEffect", url: "https://www.youtube.com/embed/dGcsHMXbSOA" },
    { id: 13, title: "React Router Explained", url: "https://www.youtube.com/embed/Ul3y1LXxzdU" },
    { id: 14, title: "Redux in React", url: "https://www.youtube.com/embed/zrs7u6bdbUw" },
    { id: 15, title: "Node.js Introduction", url: "https://www.youtube.com/embed/TlB_eWDSMt4" },
    { id: 16, title: "Express.js Basics", url: "https://www.youtube.com/embed/L72fhGm1tfE" },
    { id: 17, title: "REST API with Node.js & Express", url: "https://www.youtube.com/embed/qwfE7fSVaZM" },
    { id: 18, title: "MongoDB Basics", url: "https://www.youtube.com/embed/ExcRbA7fy_A" },
    { id: 19, title: "MERN Stack Overview", url: "https://www.youtube.com/embed/7CqJlxBYj-M" },
    { id: 20, title: "Authentication in Web Apps (JWT)", url: "https://www.youtube.com/embed/favjC6EKFgw" },
    { id: 21, title: "Deploying Web Apps with Vercel & Netlify", url: "https://www.youtube.com/embed/99yh44Hp2pA" },
    { id: 22, title: "Performance Optimization for Websites", url: "https://www.youtube.com/embed/Zv11L-ZfrSg" },
    { id: 23, title: "SEO Basics for Web Development", url: "https://www.youtube.com/embed/xFsKpxw-ruY" },
    { id: 24, title: "Building a Portfolio Website", url: "https://www.youtube.com/embed/ZtM5An4toUQ" },
    { id: 25, title: "Next.js Introduction", url: "https://www.youtube.com/embed/Sklc_fQBmcs" },
  ],

  ds: [
    { id: 1, title: "Introduction to Data Structures and Algorithms", url: "https://www.youtube.com/embed/8hly31xKli0" },
    { id: 2, title: "Arrays - Basics and Implementation", url: "https://www.youtube.com/embed/CBYHwZcbD-s" },
    { id: 3, title: "Linked Lists - Singly and Doubly Linked Lists", url: "https://www.youtube.com/embed/RBSGKlAvoiM" },
    { id: 4, title: "Stacks and Queues - Concepts and Implementation", url: "https://www.youtube.com/embed/gxdQiBkidWk" },
    { id: 5, title: "Hash Tables - Concepts and Implementation", url: "https://www.youtube.com/embed/WwfhLC16bis" },
    { id: 6, title: "Trees - Introduction and Binary Trees", url: "https://www.youtube.com/embed/qH6yxkwOrqY" },
    { id: 7, title: "Binary Search Trees (BST) - Operations and Properties", url: "https://www.youtube.com/embed/KcNt6v_56cc" },
    { id: 8, title: "Tree Traversals - Inorder, Preorder, Postorder", url: "https://www.youtube.com/embed/RIBDCF-7nkk" },
    { id: 9, title: "Heaps - Introduction and Applications", url: "https://www.youtube.com/embed/EvQfNhsT2KA" },
    { id: 10, title: "Priority Queues - Concepts and Implementation", url: "https://www.youtube.com/embed/wnbq8eheO2I" },
    { id: 11, title: "Graphs - Basics and Representation", url: "https://www.youtube.com/embed/EdIqYgxCqYI" },
    { id: 12, title: "Graph Traversal - BFS and DFS", url: "https://www.youtube.com/embed/s-CYnVz-uh4" },
    { id: 13, title: "Sorting Algorithms - Bubble, Selection, Insertion", url: "https://www.youtube.com/embed/kPRA0W1kECg" },
    { id: 14, title: "Merge Sort - Explanation & Code", url: "https://www.youtube.com/embed/JSceec-wEyw" },
    { id: 15, title: "Quick Sort - Algorithm & Example", url: "https://www.youtube.com/embed/WIrA4YexLRQ" },
    { id: 16, title: "Recursion & Backtracking - Concepts & Examples", url: "https://www.youtube.com/embed/IhJgguNiYYk" },
    { id: 17, title: "Dynamic Programming - Memoization & Tabulation", url: "https://www.youtube.com/embed/nqowUJzG-iM" },
    { id: 18, title: "Greedy Algorithms - Examples & Applications", url: "https://www.youtube.com/embed/ar9WRwCiSr0" },
    { id: 19, title: "Graph Shortest Path - Dijkstra & Bellman-Ford", url: "https://www.youtube.com/embed/wnbq8eheO2I" },
    { id: 20, title: "Graph Minimum Spanning Tree - Kruskal & Prim", url: "https://www.youtube.com/embed/Rw4s4M3hFfs" },
    { id: 21, title: "String Algorithms - Knuth-Morris-Pratt (KMP)", url: "https://www.youtube.com/embed/GTJr8OvyEVQ" },
    { id: 22, title: "Trie Data Structure - Insert and Search", url: "https://www.youtube.com/embed/zIjfhVPRZCg" },
    { id: 23, title: "Segment Trees - Range Queries", url: "https://www.youtube.com/embed/Oq2E2yGadnU" },
    { id: 24, title: "Fenwick Tree (Binary Indexed Tree) - Range Sum Queries", url: "https://www.youtube.com/embed/2bSS8rtFym4" },
    { id: 25, title: "Disjoint Set Union (Union-Find) - Concepts and Implementation", url: "https://www.youtube.com/embed/ID00PMy0-vE" },
    { id: 26, title: "Bit Manipulation - Techniques and Tricks", url: "https://www.youtube.com/embed/5s8CtiOSl2g" },
    { id: 27, title: "Number Theory - GCD, LCM, and Prime Numbers", url: "https://www.youtube.com/embed/0Oef3MHYEC0" },
    { id: 28, title: "Combinatorics - Permutations and Combinations", url: "https://www.youtube.com/embed/8RRElB0GeP4" },
    { id: 29, title: "Mathematical Algorithms - Fast Exponentiation", url: "https://www.youtube.com/embed/lu7c0rK6N8Q" },
    { id: 30, title: "Approximation Algorithms - Concepts and Examples", url: "https://www.youtube.com/embed/60z_hpEAtDg" },
  ],

  ml: [
    { id: 1, title: "Introduction to Machine Learning", url: "https://www.youtube.com/embed/i_LwzRVP7bg" },
    { id: 2, title: "Linear Regression - Theory and Implementation", url: "https://www.youtube.com/embed/4vAX0l2h4IM" },
    { id: 3, title: "Logistic Regression - Classification Model", url: "https://www.youtube.com/embed/yIYKR4sgzI8" },
    { id: 4, title: "Decision Trees - Introduction and Examples", url: "https://www.youtube.com/embed/ZVR2Way4nwQ" },
    { id: 5, title: "Random Forests - Ensemble Learning", url: "https://www.youtube.com/embed/J4Wdy0Wc_xQ" },
    { id: 6, title: "Support Vector Machines (SVM) - Concepts and Applications", url: "https://www.youtube.com/embed/efR1C6CvhmE" },
    { id: 7, title: "K-Nearest Neighbors (KNN) - Algorithm and Use Cases", url: "https://www.youtube.com/embed/6k1JEtRYO2I" },
    { id: 8, title: "Naive Bayes Classifier - Probabilistic Learning", url: "https://www.youtube.com/embed/O2L2Uv9pdDA" },
    { id: 9, title: "K-Means Clustering - Unsupervised Learning", url: "https://www.youtube.com/embed/4b5d3muPQmA" },
    { id: 10, title: "Principal Component Analysis (PCA) - Dimensionality Reduction", url: "https://www.youtube.com/embed/FgakZw6K1QQ" },
    { id: 11, title: "Natural Language Processing (NLP) - Overview and Techniques", url: "https://www.youtube.com/embed/8rXD5-xhemo" },
    { id: 12, title: "Neural Networks - Introduction to Deep Learning", url: "https://www.youtube.com/embed/aircAruvnKk" },
    { id: 13, title: "Convolutional Neural Networks (CNN) - Image Recognition", url: "https://www.youtube.com/embed/2-Ol7ZB0MmU" },
    { id: 14, title: "Recurrent Neural Networks (RNN) - Sequence Modeling", url: "https://www.youtube.com/embed/UNmqTiOnRfg" },
    { id: 15, title: "Long Short-Term Memory (LSTM) Networks - Advanced RNNs", url: "https://www.youtube.com/embed/8HyCNIVRbSU" },
    { id: 16, title: "Autoencoders - Unsupervised Feature Learning", url: "https://www.youtube.com/embed/4ok6wFi6i2E" },
    { id: 17, title: "Generative Adversarial Networks (GANs) - Synthetic Data Generation", url: "https://www.youtube.com/embed/8L11aMN5KY8" },
    { id: 18, title: "Reinforcement Learning - Training Agents", url: "https://www.youtube.com/embed/2pWv7GOvuf0" },
    { id: 19, title: "Transfer Learning - Leveraging Pre-trained Models", url: "https://www.youtube.com/embed/yofjFQddwHE" },
    { id: 20, title: "Hyperparameter Tuning - Optimizing Model Performance", url: "https://www.youtube.com/embed/2z0k8HVAJ2g" },
    { id: 21, title: "Model Deployment - Bringing Models to Production", url: "https://www.youtube.com/embed/5q5ewXKxF8I" },
    { id: 22, title: "Ethics in AI - Responsible Machine Learning", url: "https://www.youtube.com/embed/WhZ6jCwz6aE" },
    { id: 23, title: "Time Series Analysis - Forecasting Techniques", url: "https://www.youtube.com/embed/tepxdcepTbY" },
    { id: 24, title: "Anomaly Detection - Identifying Outliers", url: "https://www.youtube.com/embed/7h8lMouuOX0" },
    { id: 25, title: "Recommendation Systems - Collaborative Filtering", url: "https://www.youtube.com/embed/Eeg1DEeWUjA" },
    { id: 26, title: "Feature Engineering - Enhancing Data for Models", url: "https://www.youtube.com/embed/1BYu65vLKdA" },
    { id: 27, title: "Ensemble Methods - Boosting and Bagging", url: "https://www.youtube.com/embed/sQ870aTKqiM" },
    { id: 28, title: "Dimensionality Reduction - Techniques and Applications", url: "https://www.youtube.com/embed/1z0juu4--sY" },
    { id: 29, title: "Bayesian Inference - Probabilistic Modeling", url: "https://www.youtube.com/embed/4j9x0rTqAMY" },
    { id: 30, title: "Markov Chains - Stochastic Processes", url: "https://www.youtube.com/embed/uvYTGEZQTEs" }
  ],

   dbms: [
    { id: 1, title: "Introduction to Database Management Systems", url: "https://www.youtube.com/watch?v=6Iu45VZGQDk" },
    { id: 2, title: "DBMS Characteristics and Architecture", url: "https://www.youtube.com/watch?v=6Iu45VZGQDk&t=15m30s" },
    { id: 3, title: "Data Models: Hierarchical, Network, and Relational", url: "https://www.youtube.com/watch?v=6Iu45VZGQDk&t=30m45s" },
    { id: 4, title: "Entity-Relationship (ER) Model and Diagram", url: "https://www.youtube.com/watch?v=6Iu45VZGQDk&t=45m10s" },
    { id: 5, title: "Relational Algebra and SQL Basics", url: "https://www.youtube.com/watch?v=6Iu45VZGQDk&t=1h5m20s" },
    { id: 6, title: "Normalization: 1NF, 2NF, 3NF, and BCNF", url: "https://www.youtube.com/watch?v=6Iu45VZGQDk&t=1h25m50s" },
    { id: 7, title: "Advanced SQL Queries and Joins", url: "https://www.youtube.com/watch?v=8fyy2a5Nqns" },
    { id: 8, title: "Transactions and Concurrency Control", url: "https://www.youtube.com/watch?v=6Iu45VZGQDk&t=1h45m30s" },
    { id: 9, title: "Database Indexing and Optimization Techniques", url: "https://www.youtube.com/watch?v=6Iu45VZGQDk&t=2h5m10s" },
    { id: 10, title: "Stored Procedures, Triggers, and Views", url: "https://www.youtube.com/watch?v=6Iu45VZGQDk&t=2h25m40s" },
    { id: 11, title: "NoSQL Databases: Overview and Use Cases", url: "https://www.youtube.com/watch?v=6Iu45VZGQDk&t=2h45m15s" },
    { id: 12, title: "Database Security and Authorization", url: "https://www.youtube.com/watch?v=6Iu45VZGQDk&t=3h5m50s" },
    { id: 13, title: "Distributed Databases and Replication", url: "https://www.youtube.com/watch?v=6Iu45VZGQDk&t=3h25m30s" },
    { id: 14, title: "Big Data and Data Warehousing Concepts", url: "https://www.youtube.com/watch?v=6Iu45VZGQDk&t=3h45m10s" },
    { id: 15, title: "Database Backup and Recovery Strategies", url: "https://www.youtube.com/watch?v=6Iu45VZGQDk&t=4h5m45s" }
  ],

  os: [
    { id: 1, title: "Introduction to Operating Systems", url: "https://www.youtube.com/embed/26QPDBe-NB8" },
    { id: 2, title: "Types of Operating Systems", url: "https://www.youtube.com/embed/D5M0rx0PHqo" },
    { id: 3, title: "System Calls in OS", url: "https://www.youtube.com/embed/KLWXcTuBa04" },
    { id: 4, title: "Process Management Basics", url: "https://www.youtube.com/embed/8Xne7X0lFCI" },
    { id: 5, title: "Process Scheduling Algorithms", url: "https://www.youtube.com/embed/qJ8pzKZHMhA" },
    { id: 6, title: "Threading and Concurrency in OS", url: "https://www.youtube.com/embed/x8sh1MDtKOM" },
    { id: 7, title: "CPU Scheduling - FCFS, SJF, Round Robin", url: "https://www.youtube.com/embed/KG2_0R3_Br8" },
    { id: 8, title: "Interprocess Communication (IPC) in OS", url: "https://www.youtube.com/embed/pgwhKfmnJaI" },
    { id: 9, title: "Process Synchronization & Semaphores", url: "https://www.youtube.com/embed/sIHeWBKrUeQ" },
    { id: 10, title: "Deadlocks in Operating Systems", url: "https://www.youtube.com/embed/dEecq2hED44" },
    { id: 11, title: "Memory Management - Paging & Segmentation", url: "https://www.youtube.com/embed/DvopH9g-XF8" },
    { id: 12, title: "Virtual Memory & Demand Paging", url: "https://www.youtube.com/embed/KM-Puku2bxA" },
    { id: 13, title: "Page Replacement Algorithms", url: "https://www.youtube.com/embed/swD0fu7_o18" },
    { id: 14, title: "File Systems & File Allocation Methods", url: "https://www.youtube.com/embed/xh9Qv7K5d0A" },
    { id: 15, title: "I/O Management and Disk Scheduling", url: "https://www.youtube.com/embed/b5R3yWJLhDk" },
    { id: 16, title: "Device Management & Storage", url: "https://www.youtube.com/embed/tXzP_XCgnH4" },
    { id: 17, title: "Security & Protection in OS", url: "https://www.youtube.com/embed/Pj5A5A4TebY" },
    { id: 18, title: "Distributed Operating Systems", url: "https://www.youtube.com/embed/fv1DwaG1xLY" },
    { id: 19, title: "Real-Time Operating Systems (RTOS)", url: "https://www.youtube.com/embed/c-d-WnpyZE0" },
    { id: 20, title: "Virtualization & Cloud Computing OS", url: "https://www.youtube.com/embed/PCrN8dB2jrc" },
    { id: 21, title: "Linux OS Architecture", url: "https://www.youtube.com/embed/kU1MTz1fBZo" },
    { id: 22, title: "Windows OS Internals", url: "https://www.youtube.com/embed/kPdbsZ63_a8" },
    { id: 23, title: "MacOS & Unix OS Concepts", url: "https://www.youtube.com/embed/R_V7bl8-PGw" },
    { id: 24, title: "Shell Scripting & Command Line Basics", url: "https://www.youtube.com/embed/Wn7Eu3E28Ws" },
    { id: 25, title: "OS Case Study - Android OS", url: "https://www.youtube.com/embed/UEYHhe0PBK4" },
    { id: 26, title: "OS Case Study - iOS Internals", url: "https://www.youtube.com/embed/EzZPIOSjCdk" },
    { id: 27, title: "Cloud OS - Kubernetes & Docker Basics", url: "https://www.youtube.com/embed/kB6vL96nkhk" },
    { id: 28, title: "High-Performance Computing & OS Optimization", url: "https://www.youtube.com/embed/Oeh6ljG-Qos" },
    { id: 29, title: "Kernel & Device Drivers in OS", url: "https://www.youtube.com/embed/S5kpRqzUgTM" },
    { id: 30, title: "Future of Operating Systems - AI & ML Integration", url: "https://www.youtube.com/embed/azc1s9t-jjU" }
  ],
  
  networks: [
    { id: 1, title: "Introduction to Computer Networks", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8" },
    { id: 2, title: "Network Models: OSI and TCP/IP", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8&t=15m30s" },
    { id: 3, title: "Physical Layer: Transmission Media", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8&t=30m45s" },
    { id: 4, title: "Data Link Layer: Error Detection and Correction", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8&t=45m10s" },
    { id: 5, title: "Network Layer: IP Addressing and Routing", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8&t=1h5m20s" },
    { id: 6, title: "Transport Layer: TCP and UDP", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8&t=1h25m50s" },
    { id: 7, title: "Application Layer Protocols: HTTP, FTP, DNS", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8&t=1h45m30s" },
    { id: 8, title: "Network Security: Firewalls and VPNs", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8&t=2h5m10s" },
    { id: 9, title: "Wireless Networks: Wi-Fi and Bluetooth", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8&t=2h25m40s" },
    { id: 10, title: "Network Troubleshooting and Tools", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8&t=2h45m15s" },
    { id: 11, title: "Subnetting and CIDR Notation", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8&t=3h5m50s" },
    { id: 12, title: "Switching Techniques: Circuit and Packet Switching", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8&t=3h25m30s" },
    { id: 13, title: "Network Topologies and Design", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8&t=3h45m10s" },
    { id: 14, title: "Quality of Service (QoS) in Networks", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8&t=4h5m45s" },
    { id: 15, title: "Future Trends in Networking: IoT and 5G", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8&t=4h25m30s" }
  ],
  
  cybersec: [
    { id: 1, title: "Introduction to Cyber Security", url: "https://www.youtube.com/watch?v=2QpTjE6AvI8" },
    { id: 2, title: "Types of Cyber Threats: Malware, Phishing, and More", url: "https://www.youtube.com/watch?v=0eZ6bXcQb9Y" },
    { id: 3, title: "Fundamentals of Network Security", url: "https://www.youtube.com/watch?v=KMI0FLWpSew" },
    { id: 4, title: "Understanding Firewalls and Their Importance", url: "https://www.youtube.com/watch?v=G5E2D4MraMk" },
    { id: 5, title: "Intrusion Detection and Prevention Systems", url: "https://www.youtube.com/watch?v=F5G8t2r2CjQ" },
    { id: 6, title: "Basics of Cryptography", url: "https://www.youtube.com/watch?v=6imPz5RJp6E" },
    { id: 7, title: "Public Key Infrastructure (PKI) Explained", url: "https://www.youtube.com/watch?v=7zYvP2xX0PM" },
    { id: 8, title: "Secure Software Development Practices", url: "https://www.youtube.com/watch?v=8h9w5lIv1lA" },
    { id: 9, title: "Understanding Social Engineering Attacks", url: "https://www.youtube.com/watch?v=9i7lN5v3L0g" },
    { id: 10, title: "Incident Response and Management", url: "https://www.youtube.com/watch?v=10j8lN6mM1h" },
    { id: 11, title: "Risk Assessment and Management in Cyber Security", url: "https://www.youtube.com/watch?v=11k9mN7nN2i" },
    { id: 12, title: "Security Policies, Procedures, and Compliance", url: "https://www.youtube.com/watch?v=12l0nO8oO3j" },
    { id: 13, title: "Introduction to Ethical Hacking", url: "https://www.youtube.com/watch?v=13m1oP9pP4k" },
    { id: 14, title: "Penetration Testing Methodologies", url: "https://www.youtube.com/watch?v=14n2pQ0qQ5l" },
    { id: 15, title: "Wireless Network Security", url: "https://www.youtube.com/watch?v=15o3qR1rR6m" },
    { id: 16, title: "Cloud Security Fundamentals", url: "https://www.youtube.com/watch?v=16p4rS2sS7n" },
    { id: 17, title: "Mobile Device Security Best Practices", url: "https://www.youtube.com/watch?v=17q5sT3tT8o" },
    { id: 18, title: "Understanding Ransomware and Defense Strategies", url: "https://www.youtube.com/watch?v=18r6tU4uU9p" },
    { id: 19, title: "Introduction to Digital Forensics", url: "https://www.youtube.com/watch?v=19s7uV5vV0q" },
    { id: 20, title: "Security Operations Centers (SOC) and Their Role", url: "https://www.youtube.com/watch?v=20t8vW6wW1r" },
    { id: 21, title: "Identity and Access Management (IAM)", url: "https://www.youtube.com/watch?v=21u9wX7xX2s" },
    { id: 22, title: "Understanding Zero Trust Security Models", url: "https://www.youtube.com/watch?v=22v0xY8yY3t" },
    { id: 23, title: "Introduction to Blockchain Security", url: "https://www.youtube.com/watch?v=23w1yZ9zZ4u" },
    { id: 24, title: "Artificial Intelligence in Cyber Security", url: "https://www.youtube.com/watch?v=24x2zA0aA5v" },
    { id: 25, title: "Future Trends in Cyber Security", url: "https://www.youtube.com/watch?v=25y3aB1bB6w" }
  ]
  
};

const CourseVideos = () => {
  const { id } = useParams(); // Get course ID from URL
  const videosPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  if (!id) {
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        Error: Course not found
      </div>
    );
  }

  const filteredVideos = courseVideosData[id] || [];
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  // Scroll to top when changing pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        {id.toUpperCase()} Course Videos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {currentVideos.map((video) => (
          <div key={video.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <iframe
              className="w-full h-48"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {video.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded 
              ${
                currentPage === 1
                  ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                  : "bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700"
              }`}
          >
            Prev
          </button>

          {/* Numbered Page Buttons */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`mx-1 px-3 py-1 border rounded 
                ${
                  currentPage === i + 1
                    ? "bg-blue-500 dark:bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded 
              ${
                currentPage === totalPages
                  ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                  : "bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700"
              }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseVideos;
