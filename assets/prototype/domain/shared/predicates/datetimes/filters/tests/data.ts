import { Datetime } from '../../../../../eventEditor/data/types';
import { DatetimeStatus } from '../../../../../eventEditor/data/types';

const dates: Datetime[] = [
	{
		id: 'RGF0ZXRpbWU6ODM=',
		capacity: -1,
		isActive: true,
		sold: 0,
	},
	{
		id: 'RGF0ZXRpbWU6ODM=',
		capacity: 10,
		isActive: true,
		sold: 5,
		status: DatetimeStatus.active,
	},
	{
		id: 'RGF0ZXRpbWU6ODM=',
		capacity: 10,
		isActive: true,
		sold: 6,
		status: DatetimeStatus.active,
	},
	{
		id: 'RGF0ZXRpbWU6ODM=',
		capacity: 10,
		isActive: true,
		sold: 7,
		status: DatetimeStatus.active,
	},
	{
		id: 'RGF0ZXRpbWU6ODM=',
		capacity: 10,
		isActive: true,
		sold: 8,
		status: DatetimeStatus.active,
	},
	{
		id: 'RGF0ZXRpbWU6ODM=',
		capacity: 10,
		isActive: false,
		isUpcoming: true,
		sold: 9,
		status: DatetimeStatus.active,
	},
	{
		id: 'RGF0ZXRpbWU6ODM=',
		capacity: 10,
		isActive: false,
		isUpcoming: true,
		sold: 10,
		status: DatetimeStatus.active,
	},
];

export default dates;
