import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { useData } from '../hooks';

import { HocOptions } from './types';

const withData = (options: HocOptions) => {
  const { url, name, queryParams = {}, fetchOptions = {} } = options;

  if (!name && process.env.NODE_ENV !== 'production') {
    console.warn('No `name` is passed to `withData` HOC, defaulting to `data`. Please provide a name to avoid props name collision!');
  }

  return (Component: React.ElementType) => {
    return hoistNonReactStatics((props: any) => {
      const { data, loading, error } = useData(url, queryParams, fetchOptions);
      const dataProps = {
        [name || 'data']: {
          data,
          loading,
          error,
        },
      };

      return <Component {...props} {...dataProps} />;
    }, Component);
  };
};

export default withData;