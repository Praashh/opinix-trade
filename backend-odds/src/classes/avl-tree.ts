export class AVLNode<T> {
    key: number;
    value: T;
    height: number;
    left: AVLNode<T> | null;
    right: AVLNode<T> | null;

    constructor(key: number, value: T) {
        this.key = key;
        this.value = value;
        this.height = 1;
        this.left = null;
        this.right = null;
    }
}

export class AVLTree<T> {
    root: AVLNode<T> | null;

    constructor() {
        this.root = null;
    }

    private getHeight(node: AVLNode<T> | null): number {
        return node ? node.height : 0;
    }

    private getBalanceFactor(node: AVLNode<T>): number {
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    private updateHeight(node: AVLNode<T>): void {
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    }

    private rotateRight(y: AVLNode<T>): AVLNode<T> {
        const x = y.left!;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        this.updateHeight(y);
        this.updateHeight(x);

        return x;
    }

    private rotateLeft(x: AVLNode<T>): AVLNode<T> {
        const y = x.right!;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        this.updateHeight(x);
        this.updateHeight(y);

        return y;
    }

    insert(key: number, value: T): void {
        this.root = this.insertNode(this.root, key, value);
    }

    private insertNode(node: AVLNode<T> | null, key: number, value: T): AVLNode<T> {
        if (!node) {
            return new AVLNode(key, value);
        }

        if (key < node.key) {
            node.left = this.insertNode(node.left, key, value);
        } else if (key > node.key) {
            node.right = this.insertNode(node.right, key, value);
        } else {
            // Update value if key already exists
            node.value = value;
            return node;
        }

        this.updateHeight(node);

        const balance = this.getBalanceFactor(node);

        // Left Left Case
        if (balance > 1 && key < node.left!.key) {
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balance < -1 && key > node.right!.key) {
            return this.rotateLeft(node);
        }

        // Left Right Case
        if (balance > 1 && key > node.left!.key) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        // Right Left Case
        if (balance < -1 && key < node.right!.key) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    find(key: number): T | null {
        let current = this.root;
        while (current) {
            if (key === current.key) {
                return current.value;
            }
            current = key < current.key ? current.left : current.right;
        }
        return null;
    }

    // New methods: delete, findMin, findMax

    delete(key: number): void {
        this.root = this.deleteNode(this.root, key);
    }

    private deleteNode(node: AVLNode<T> | null, key: number): AVLNode<T> | null {
        if (!node) {
            return null;
        }

        if (key < node.key) {
            node.left = this.deleteNode(node.left, key);
        } else if (key > node.key) {
            node.right = this.deleteNode(node.right, key);
        } else {
            // Node to be deleted found

            // Node with only one child or no child
            if (!node.left) {
                return node.right;
            } else if (!node.right) {
                return node.left;
            }

            // Node with two children
            const minNode = this.findMinNode(node.right);
            node.key = minNode?.key!;
            node.value = minNode?.value!;
            node.right = this.deleteNode(node.right, minNode?.key!);
        }

        this.updateHeight(node);

        const balance = this.getBalanceFactor(node);

        // Left Left Case
        if (balance > 1 && this.getBalanceFactor(node.left!) >= 0) {
            return this.rotateRight(node);
        }

        // Left Right Case
        if (balance > 1 && this.getBalanceFactor(node.left!) < 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balance < -1 && this.getBalanceFactor(node.right!) <= 0) {
            return this.rotateLeft(node);
        }

        // Right Left Case
        if (balance < -1 && this.getBalanceFactor(node.right!) > 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    findMin(): T | null {
        const minNode = this.findMinNode(this.root);
        return minNode ? minNode.value : null;
    }

    private findMinNode(node: AVLNode<T> | null): AVLNode<T> | null {
        if (!node) {
            return null;
        }
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    findMax(): T | null {
        const maxNode = this.findMaxNode(this.root);
        return maxNode ? maxNode.value : null;
    }

    private findMaxNode(node: AVLNode<T> | null): AVLNode<T> | null {
        if (!node) {
            return null;
        }
        while (node.right) {
            node = node.right;
        }
        return node;
    }
}

//  Time Complexity: O(Log(n)) + rotation is taking o(1) => o(Log(n)) 