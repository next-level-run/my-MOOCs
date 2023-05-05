'use strict';

const API_BASE_URL = 'http://localhost:3000/api/v1'

function DataService($http) {

  this.getUser = function() {
    return $http.get(`${API_BASE_URL}/users`);
  };

  this.createUser = function(user) {
    return $http.post(`${API_BASE_URL}/users`, user);
  };

  this.getCourses = function() {
    return $http.get(`${API_BASE_URL}/courses`);
  };

  this.getCourse = function(id) {
    return $http.get(`${API_BASE_URL}/courses/${id}`);
  };

  this.createCourse = function(course) {
    return $http.post(`${API_BASE_URL}/courses`, course);
  };

  this.updateCourse = function(course) {
    return $http.put(`${API_BASE_URL}/courses/${course._id}`, course);
  };

  this.createReview = function(courseId, review) {
    return $http.post(`${API_BASE_URL}/courses/${courseId}/reviews`, review);
  };

  this.deleteReview = function(courseId, id) {
    return $http.delete(`${API_BASE_URL}/courses/${courseId}/reviews${id}`);
  };

}

module.exports = DataService;
