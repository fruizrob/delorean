export default `function showReportOfBadCourses() {
    show("Showing bad courses");
}

function showReportOfOutLayerCourses() {
    show("Showing outlayer courses");
}

function showReportOfBestCourses() {
    show("Showing best courses");
}

function show(x) {
    console.log(x);
}

var universityMean = 5.0;
var maximumMean = 7.0;
var realMean = universityMean/maximumMean;

delorean.insertTimepoint('TestingDifferentResults');

show(realMean);

if (realMean < 0.2) {
	showReportOfBadCourses();
} else if (realMean >= 0.2 && realMean < 0.8) {
	showReportOfOutLayerCourses();
} else if (realMean >= 0.8) {
	showReportOfBestCourses();
}

throw "Triggering a tester exception";`;
