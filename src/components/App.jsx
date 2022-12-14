import React, { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Box } from './Box';
import { FeedbackOptions } from './FeedbackOptions';
import { Statistics } from './Statistics';
import { Notification } from './Notification';
import Section from './Section/Section';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onLeaveFeedback = el => {
    this.setState(prevState => ({
      [el]: prevState[el] + 1,
    }));
  };

  countTotalFeedback = () => {
    return Object.values(this.state).reduce((acc, counter) => {
      return acc + counter;
    }, 0);
  };

  countPositiveFeedbackPercentage = () => {
    return `
    ${Math.round((this.state.good / this.countTotalFeedback()) * 100) || 0}%`;
  };

  render() {
    const { good, neutral, bad } = this.state;
    return (
      <Box paddingTop={6}>
        <Section title="Please Leave feedback">
          <FeedbackOptions
            value={['good', 'neutral', 'bad']}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          {this.countTotalFeedback() ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
        <GlobalStyle />
      </Box>
    );
  }
}
