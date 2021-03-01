import React from 'react';
import PropTypes from 'prop-types';
import Cookie from 'js-cookie';

class RoomsLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.defaultData,
      cookieId: props.cookieId,
      didMount: props.didMount,
    };
  }

  componentDidMount() {
    const { cookieId, didMount } = this.state;
    const cookies = Cookie.getJSON(cookieId);
    if (cookies && Array.isArray(cookies)) {
      this.setState({
        data: cookies,
        didMount: true,
      },
      () => console.log(this.state));
    } else {
      this.setState({ didMount: true });
    }
  }

  render() {
    const { data, cookieId, didMount } = this.state;
    const { children } = this.props;
    return children({ data, cookieId, didMount });
  }
}

RoomsLoader.defaultProps = {
  defaultData: null,
};

RoomsLoader.propTypes = {
  children: PropTypes.any.isRequired,
  cookieId: PropTypes.string.isRequired,
  defaultData: PropTypes.any,
  didMount: PropTypes.bool.isRequired,
};

export default RoomsLoader;

/*

  USAGE:

    <DataFetcher data={SAMPLE_DATA}>
      {({ loading, data }) => (
        <FrontPage
          loading={loading}
          data={data}
          showDetails={this.showDetails}
        />
      )}
    </DataFetcher>

*/
