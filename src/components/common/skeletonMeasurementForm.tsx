import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { responsiveHeight, responsiveWidth } from '../../constant/theme';

const SkeletonMeasurementForm = () => {
	return (
		<SkeletonPlaceholder>
			<View style={styles.skeletonDesignContainer}>
				<View style={styles.skeletonText} />
				<View style={styles.skeletonDesignImage} />
			</View>

			<View style={styles.skeletonMeasurementsContainer}>
				{Array(7)
					.fill(null)
					.map((_, index) => (
						<View key={index} style={styles.skeletonMeasurementRow}>
							<View style={styles.skeletonInput} />
							<View style={styles.skeletonUnit} />
						</View>
					))}
			</View>
		</SkeletonPlaceholder>
	);
};

const styles = StyleSheet.create({
	skeletonHeader: {
		width: '50%',
		height: 20,
		marginBottom: 20,
		backgroundColor: '#E0E0E0',
		borderRadius: 4
	},
	skeletonText: {
		// marginTop: responsiveWidth('4'),
		width: responsiveWidth('30'),
		height: responsiveWidth('6%'),
		borderRadius: 4,
		marginVertical: responsiveWidth('4')
	},
	skeletonDesignContainer: {
		// alignItems: 'center',
		// marginBottom: 30,
		margin: responsiveWidth('5')
	},
	skeletonDesignImage: {
		width: responsiveWidth('30'),
		height: responsiveWidth('30'),
		backgroundColor: '#E0E0E0',
		borderRadius: 8
	},
	skeletonMeasurementsContainer: {
		margin: responsiveWidth('5'),
        height:responsiveHeight("100")
	},
	skeletonMeasurementRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15
	},
	skeletonInput: {
		width: responsiveWidth('55'),
		height: responsiveWidth('10%'),
		backgroundColor: '#E0E0E0',
		borderRadius: 4,
		marginRight: 10
	},
	skeletonUnit: {
		width: responsiveWidth('30'),
		height: responsiveWidth('10%'),
		backgroundColor: '#E0E0E0',
		borderRadius: 4
	}
});

export default SkeletonMeasurementForm;
