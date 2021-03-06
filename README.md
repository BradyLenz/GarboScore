# [GarboScore](https://garboscore.bradylenz.com/tech)
MadHacks Carbon - Fall 2019 Sustainability SaaS

[Visit our site!](https://garboscore.bradylenz.com/tech)

## What is it?
Using machine learning and object detection, given an X-Ray of garbage, our system scores the garbage based on the number of recyclable items that should not be going to a landfill. In theory, if garbage collection trucks implemented an 'imaging' step inside of the truck, this system could rate addresses/households based on what they are throwing away. A city could implement a 'sustainability tax break' where households are incentivized to properly recycle.

## How does it work?
We used Google AutoML to detect common recyclable items in an 'x-ray' styled image. This result is then fed into a scoring web API that logs the garbage collection, address of collection, and garbage score. The data is stored in MongoDB for consumption by the city when running reports for the 'sustainability tax break'. The API can be used automatically from the garbage trucks, however, for demo purposes, we include the ability to simulate a garbage collection via our [site demo.](https://garboscore.bradylenz.com/demo)

## Technologies

### Domain.com
We used the free `garboscore.tech` domain for this project.

### Google Cloud Platform
We utilzed Cloud Build, and Cloud Build triggers to setup the build pipeline for our web app, as well as for our backend Cloud Functions. Our machine learning models were trained using Cloud AutoML. Furthermore, we used Google Analytics to track page views, and event interactions.

### Google Firebase
Our web app is hosted on the Google Firebase CDN.

### MongoDB
We hosted our MongoDB cluster with MongoDB Atlas. We have a relatively simple one collection database where we store the results of the machine learning predictions.

## Examples

