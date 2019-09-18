'use strict';

class List {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  /**
   * Sorts the List in ascending ASCII order and updates the list length 
   */
  reindex() {
    let data = Object.keys(this.data).sort().reduce((acc, val, idx) => {
      acc[idx] = this.data[val];
      return acc;
    }, {});

    this.length = Object.keys(data).length;
    this.data = data;
  }

  /**
   * Adds/pushes a given item into the list
   * @param {string} Item to be added to List
   * @returns {number} Length of list after adding item
   */
  push(item) {
    if (arguments.length === 1) {
      this.data[this.length++] = item;
    }
    return this.length;
  }

  /**
   * Deletes/pops the last item from the list
   * @returns {undefined} 
   */
  pop() {
    if (!this.length) {
      return undefined;
    }
    let item = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return item;
  }

  /**
   * Deletes the first item from the list
   * @returns {string} First item that was in the list
   */
  shift() {
    if (!this.data[0]) {
      return undefined;
    }
    let item = this.data[0];
    delete this.data[0];
    this.reindex();
    return item;
  }

  /**
   * Adds the given item to the beginning of the list
   * @param {string} 
   * @returns {undefined} 
   */
  unshift(item) {
    this.data[-1] = item;
    this.reindex();
    return this.length;
  }

  /**
   * Runs the given callback function on each item in the list. Modifies the original list in place.
   * @param {callback} 
   */
  forEach(callback) {
    if (this.length) {
      for (let i = 0; i <= this.length - 1; i++) {
        callback(this[i], i);
      }
    }
  }

  /**
   * Runs the given callback function on each item in the list. Creates a new list to return but does not modify the existing list.
   * @param {function} Callback
   * @returns {object} New List that has been mapped through
   */
  map(callback) {
    if (!this.length) {
      return undefined;
    }
    let result = new List();
    for (let i = 0; i <= this.length - 1; i++) {
      result.push(callback(this.data[i], i));
    }
    return result;
  }

  /**
   * Filters the list using the given callback function. If the callback function returns true for an item then it pushes the item into a new List. 
   * And then the new filtered list is returned.
   * @param {function} Callback function
   * @returns {object} New List that has been mapped through
   */
  filter(callback) {
    if (!this.length) {
      return undefined;
    }
    let result = new List();
    for (let i = 0; i <= this.length - 1; i++) {
      if (callback(this.data[i])) {
        result.push(this.data[i]);
      }
    }
    return result;
  }

  /**
   * Runs the given callback function on each item in the list to return a single value.
   * @param {function} Callback function
   * @param {state} Initial Value
   * @returns {state} 
   */
  reduce(callback, state) {
    if (!this.length) {
      return undefined;
    }
    for (let i = 0; i <= this.length - 1; i++) {
      state = callback(state, this.data[i], i);
    }
    return state;
  }

}

module.exports = List;