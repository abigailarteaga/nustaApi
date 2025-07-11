const express = require('express');
const mongoose = require('mongoose');
const app = require('./app');

const PORT = 3043;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});