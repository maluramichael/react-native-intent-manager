/**
 * import {BrowserIntent, PhoneIntent, SMSIntent, MailIntent, SocialShare} from './IntentManager';
 */
import {
	NativeModules,
	Linking,
	Platform
} from 'react-native';
import Share from 'react-native-share';
import Communications from 'react-native-communications';
var Mailer = require('NativeModules').RNMail; // Mail Intent for Android

/**
 * @param url
 */
export function BrowserIntent(url) {
	Linking.openURL(url);
}
/**
 * @param phoneNumber
 */
export function PhoneIntent(phoneNumber) {
	Linking.openURL(`tel:${phoneNumber}`);
}
/**
 *
 * @param phoneNumber
 * @param body
 */
export function SMSIntent(phoneNumber, body) {
	Linking.openURL(`sms:${phoneNumber}?body=${body}`);
}

/**
 * @param config
 * example usage:
 * MailIntent({
 *	email  : "adel.grimm@socialbit.de",
 *	subject: "Subject",
 *	body   : "Body"
 * });
 */
export function MailIntent(config) {
	if (Platform.OS === 'android') {
		// Linking.openURL(`mailto:${config.email}?subject=${config.subject}`);
		Mailer.mail({
			subject   : config.subject,
			recipients: [config.email],
			body      : config.body,
			attachment: {
				path: '',  	// The absolute path of the file from which to read data.
				type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf
				name: ''   	// Optional: Custom filename for attachment
			}
		}, (error, event) => {
			if (error) {
				alert('Error: Could not send mail. Please send a mail to foo@foo.com');
			}
		});
	} else {
		Communications.email([config.email], null, null, config.subject, config.body);
	}
}

/**
 * @param shareText
 * @param shareURL
 * @param shareTitle
 */
export function SocialShare(shareText, shareURL, shareTitle) {
	Share.open({
		message: shareText,
		url    : shareURL,
		title  : shareTitle
	}, function (e) {
		console.log(e);
	});
}

/**
 * TODO: Implement Calendar and Map Intent
 */
export function CalendarIntent() {
	//RNSendIntentAndroid.openCalendar();
	//RNSendIntentAndroid.addCalendarEvent(config.title, config.description, config.startDate, config.endDate, config.recurrence);
}
export function MapIntent() {
	if (Platform.OS === 'android') {
		alert('MapIntent not implemented yet');
	} else {
	}
}
