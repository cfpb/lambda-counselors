// The MIT License (MIT)
//
// Copyright (c) 2016 Claudemiro
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

process.env.PATH = `${process.env.PATH}:${process.env.LAMBDA_TASK_ROOT}`;

const hewer = require("hewer");

function Formatter() {
  this.format = (message, level, meta) =>
    `${level} ${message} ${JSON.stringify(meta)}`;
}

module.exports = {
  bucket: process.env.COUNSELORS_PDF_S3_BUCKET || "housing-counselor-pdfs",
  region: process.env.COUNSELORS_PDF_AWS_REGION || "us-east-1",
  logger: new hewer.Logger(null, null, new Formatter())
};
