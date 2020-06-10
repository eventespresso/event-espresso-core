import React from 'react';

import BannerAdapter, { BannerProps } from '@infraUI/display/Banner';

import './style.scss';

const Banner: React.FC<BannerProps> = (props) => <BannerAdapter {...props} />;

export default Banner;
