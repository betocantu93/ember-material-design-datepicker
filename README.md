# Ember-material-design-datepicker

[![Build Status](https://travis-ci.org/angliafarmers/ember-material-design-datepicker.svg?branch=master)](https://travis-ci.org/angliafarmers/ember-material-design-datepicker)
[![Code Climate](https://codeclimate.com/github/angliafarmers/ember-material-design-datepicker/badges/gpa.svg)](https://codeclimate.com/github/angliafarmers/ember-material-design-datepicker)

This project aims to bring an easy to use [Material Design](https://www.google.com/design/spec/material-design/introduction.html) themed datepicker to Ember.

## Installation

Install the ember-cli addon in your ember-cli project:

```
$ ember install ember-material-design-datepicker
```
This should also automatically create an scss file under `app/styles/app.scss` with `@import 'ember-material-design-datepicker';` and install `ember-cli-sass`.

Sass is required for this addon. There are a number of sass variables that can easily be overidden to change the default styling of Ember-material-design-datepicker, these are detailed in usage below.

## Usage

### Options
 * dateChanged (required) - When the user selects a new date, or edits the date's text, this action is fired with the new date as the first argument. If the date is deemed invalid then 'null' is sent. The second argument is a bool indicating whether the date was entered was valid or not. In most circumstances your application should consume this action and update ```selectedDate```.
 * selectedDate (optional) - The date that should currently be selected
 * mode (optional) - 'date' or 'datetime' can be set. Defaults to 'date'.
 * dateFormat (optional) - Allows the format of the date's text to be changed. Defaults to MM/DD/YYYY.
 * timeFormat (Optional) Sets the format of the time. Defaults to 'HH:mm' (Uppercase HH for 24hour clock. lowercase for 12hour).
 * required (optional) - Passed onto the input element and used when validating. Defaults to false.
 * disabled (optional) - Passed onto the input element. When true it prevents the date from being changed. Defaults to false.
 * placeholder (optional) - The text to display above the date's text.
 * relaxValidation (optional) - When set to true this turns off the 'use strict mode' option within Moment.js when validating the date's text. Defaults to false.
 * inputClass (optional) - Passed directly onto the input element as its class attribute.
 * name (optional) - Passed directly onto the input element.
 * errorMessage (optional) - When provided an error message can be displayed below the input element.
 * minDate (optional) - When provided this prevents the user from selecting a date earlier than this. It is also used when validating the date's text.
 * maxDate (optional) - When provided this prevents the user from selecting a date after this. It is also used when validating the date's text.
 * utc (optional) - When true dates are parsed in UTC. Defaults to false where local time is then used.
 * hourOffset (optional) - When provided, dates selected or entered will apply this offset from midnight.
 * autoHideAfterSelection (optional) - Default: true. When false, the datepicker remains on display after selecting date.
 * locale (optional) - Default: 'en'. Sets component's locale. [See moment.js instance locales](https://momentjs.com/docs/#/i18n/instance-locale/).
 * dropUp (optional) - Default: false. Causes the control to drop up when true.  Drops down by default/when false.

### Sass variables

A number of sass variables can be overridden by your application [See the top of ember-material-design-datepicker.scss](ember-material-design-datepicker.scss).

## Collaborating

We welcome pull requests. For enhancements we suggest you open an issue first, and then if accepted volunteer to take on the feature yourself.

### Styling
We use Eslint to enforce styling. We aim to match [Ember Styling Guide](https://github.com/emberjs/ember.js/blob/master/STYLEGUIDE.md) but this is a work in progress.

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
