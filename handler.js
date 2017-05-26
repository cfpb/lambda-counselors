"use strict";

const config = require("./config.js");

const wkhtmltopdf = require("wkhtmltopdf");
const fs = require("fs");
const AWS = require("aws-sdk");

const logger = config.logger;
const S3 = new AWS.S3();

module.exports.pdf = (event, context, callback) => {
  const params = event.queryStringParameters || {};

  // Redirect to the find-a-housing-counselor website if no zipcode is provided.
  if (!params.zipcode || !/^\d{5}$/.test(params.zipcode)) {
    logger.log().error("Valid zip code was not provided.");
    callback(null, {
      statusCode: 301,
      headers: {
        Location: "https://www.consumerfinance.gov/find-a-housing-counselor/"
      },
      body: ""
    });
    return;
  }

  const zipcode = params.zipcode;
  const url = `https://www.consumerfinance.gov/find-a-housing-counselor/?zipcode=${zipcode}&pdf`;
  const output = `/tmp/${zipcode}`;
  const writeStream = fs.createWriteStream(output);

  wkhtmltopdf(url, { pageSize: "letter" }, () => {
    S3.upload(
      {
        Bucket: config.bucket,
        ACL: "public-read",
        Key: `${zipcode}.pdf`,
        Body: fs.createReadStream(output),
        ContentType: "application/pdf"
      },
      (error, data) => {
        if (error != null) {
          logger.log({ error }).error("Unable to send file to S3.");
          callback("Unable to send file to S3.", {});
        } else {
          const response = {
            statusCode: 301,
            headers: {
              Location: data.Location,
              // Cache for a day, we update the HUD results nightly.
              "Cache-Control": "max-age=86400"
            },
            body: ""
          };
          logger.log(data).info("Upload complete.");
          callback(null, response);
        }
      }
    );
  }).pipe(writeStream);
};
