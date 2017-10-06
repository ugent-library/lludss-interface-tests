import './strip-google-analytics';
import './chai.helpers';

global.parseResultCount = function(results) {
    return parseInt(results.replace(/,/g, ''));
};

