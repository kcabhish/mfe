import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import Progress from './components/Progress';
import Header from './components/Header';

const MarketingLazy = lazy(() => import('./components/marketingApp'));
const authLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
  // instead of generating classnames as jss1, jss2 it will create ma1, ma2
  productionPrefix: 'co',
});

export default () => {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth" component={authLazy}></Route>
              <Route path="/" component={MarketingLazy}></Route>
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
