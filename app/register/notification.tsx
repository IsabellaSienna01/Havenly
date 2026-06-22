import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, G, Line } from 'react-native-svg';
import Progress from '@/components/progress';
import { useTheme } from '@/theme/ThemeContext';
import { settingsStore } from '@/utils/settingsStore';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function NotificationPage() {
  const router = useRouter();
  const { colors, scale, settings } = useTheme();

  const handleUpdate = (updates: Partial<typeof settings>) => {
    settingsStore.updateSettings(updates);
  };

  const handleNext = () => {
    router.push('/home');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.secondary }]} edges={['top']}>
      <LinearGradient
        colors={[colors.secondary, colors.primary]}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Background blob */}
      <View style={styles.blobContainer} pointerEvents="none">
        <Svg width="100%" height="100%" viewBox="0 0 345 319" fill="none">
          <G id="Group 77">
            <Path id="Vector" d="M216.317 137.566C219.494 139.907 222.654 141.915 225.459 144.344C239.227 156.297 242.865 174.143 234.454 188.071C229.739 195.864 222.56 200.357 214.019 202.833C202.683 206.127 191.123 206.34 179.464 205.108C178.361 204.996 177.264 204.917 175.576 204.779C176.084 206.676 176.528 208.125 176.847 209.603C178.802 218.846 181.649 228.024 182.487 237.364C185.739 273.74 159.259 299.228 122.946 295.267C106.782 293.506 92.584 287.173 80.1239 276.809C67.5864 266.373 57.8037 253.756 50.4998 239.222C40.679 219.675 33.319 199.162 27.1087 178.216C25.3052 172.13 26.5416 167.737 30.3927 165.024C33.9511 162.521 39.8465 162.803 44.2153 165.679C48.1657 168.299 48.5254 172.309 44.7657 175.214C43.017 176.557 42.3732 177.618 43.0655 179.783C55.774 219.983 78.6862 251.43 118.695 268.263C121.199 269.318 123.823 270.08 126.42 270.932C149.952 278.615 166.728 258.47 165.812 241.167C165.478 234.958 164.206 228.635 162.288 222.714C160.042 215.789 157.022 209.03 153.529 202.642C151.128 198.241 147.352 194.586 144.122 190.647C143.132 189.431 141.796 188.492 140.826 187.265C136.611 181.98 136.786 175.164 141.183 170.835C145.424 166.64 152.232 166.286 157.244 170.604C170.593 182.138 186.45 184.318 203.166 183.326C206.387 183.128 209.736 182.276 212.69 180.978C220.337 177.628 222.685 168.985 217.009 162.905C213.547 159.194 208.688 156.304 203.912 154.411C196.752 151.564 189.066 150.044 181.692 147.693C176.409 146.012 173.316 141.719 173.329 136.897C173.348 131.945 176.354 127.747 181.441 125.812C183.039 125.199 184.737 124.862 186.407 124.451C189.618 123.673 193.037 123.419 195.996 122.105C203.415 118.803 211.174 115.799 217.806 111.259C228.298 104.091 230.246 93.3531 224.504 82.049C212.268 57.9821 188.589 45.1823 161.77 48.2521C116.79 53.4162 87.9689 84.0241 80.1167 121.407C75.9976 140.972 83.902 156.87 98.1087 169.844C104.29 175.497 109.953 175.117 116.662 169.875C116.896 169.697 117.089 169.491 117.333 169.333C119.987 167.55 122.551 164.455 126.07 167.03C129.303 169.405 128.956 173.074 128.072 176.501C126.279 183.497 121.835 188.043 114.877 189.901C104.983 192.552 95.5545 191.075 87.5623 184.753C71.9525 172.401 60.3733 157.176 57.1345 136.929C55.3892 126.036 57.676 115.431 61.5979 105.311C74.9954 70.7246 99.5182 48.1156 135.337 38.2429C152.842 33.4176 170.739 30.2729 188.904 33.6147C217.236 38.8334 234.838 56.799 243.579 83.3217C249.399 100.974 243.291 116.079 229.468 128.04C225.497 131.491 220.938 134.258 216.317 137.566Z" fill={colors.secondary} />
            <Path id="Vector_2" d="M314.903 112.298C309.808 128.988 300.1 141.346 284.074 148.125C278.049 150.671 271.72 151.908 265.147 150.8C259.012 149.772 254.709 145.894 253.668 140.628C252.643 135.416 255.184 130.124 260.409 126.831C262.107 125.769 263.877 124.745 265.753 124.083C287.439 116.379 297.414 100.065 299.342 78.055C299.787 72.9986 298.948 67.8254 298.771 62.6999C298.722 61.2526 298.958 59.7906 299.059 58.3382C300.511 58.7191 302.176 58.7681 303.397 59.5415C310.166 63.8209 313.957 70.3139 316.187 77.7937C319.705 89.5423 317.714 101.091 314.903 112.298Z" fill={colors.secondary} />
            <Path id="Vector_3" d="M337.189 162.318C328.7 187.291 309.938 198.299 284.877 195.384C279.544 194.759 275.029 192.267 272.272 187.399C270.184 183.716 270.099 179.837 272.638 176.439C275.034 173.246 278.12 171.723 282.652 172.16C286.622 172.546 290.764 170.908 294.848 170.356C313.659 167.795 324.057 156.054 329.433 138.805C329.776 137.704 329.961 136.524 330.498 135.546C331.059 134.543 331.976 133.728 332.735 132.833C333.588 133.679 334.796 134.383 335.235 135.402C339.131 144.43 339.358 153.721 337.189 162.318Z" fill={colors.secondary} />
            <Path id="Vector_4" d="M115.017 134.595C112.633 132.793 108.716 130.716 105.979 127.6C101.414 122.418 103.466 116.41 109.484 113.039C121.854 106.115 128.636 113.497 134.188 123.209C136.109 126.578 135.132 130.226 131.747 132.263C127.084 135.061 121.868 135.824 115.017 134.595Z" fill={colors.secondary} />
          </G>
        </Svg>
      </View>

      <View style={styles.progressWrapper}>
        <Progress value={6} max={7} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Top Graphic Area (Live Preview) */}
        <View style={styles.previewSection}>
          <View style={[styles.previewCard, { backgroundColor: '#FDEFC8', borderColor: '#FBDE8C' }]}>
            {/* Top Left Corner Cutout */}
            <View style={styles.previewCornerCutout}>
              <Svg width="82" height="79" viewBox="0 0 81.876 78.5791" fill="none">
                <Path d="M81.876 0C71.0153 4.69171 63 12.9522 63 27.5C63 55 51.5 65.5 18.5 65.5C10.4173 65.5 4.05816 69.7291 0 78.5791V40C0 17.9086 17.9086 1.53012e-07 40 0H81.876Z" fill="#FBDE8C" />
              </Svg>
            </View>

            {/* Eye Icon inside Cutout */}
            <View style={[styles.previewEyeContainer, { backgroundColor: '#FDEFC8', top: 12, left: 12 }]}>
              <Svg width="24" height="18" viewBox="0 0 23.901 17.6" fill="none">
                <Path d="M11.9505 1.1C5.96185 1.1 2.63472 5.75768 1.45161 7.82803C1.20889 8.25277 1.08753 8.46514 1.10089 8.78196C1.11426 9.09877 1.25694 9.30579 1.54231 9.71981C2.95053 11.7629 6.7738 16.5 11.9505 16.5C17.1272 16.5 20.9505 11.7629 22.3587 9.71981C22.6441 9.30579 22.7868 9.09877 22.8001 8.78196C22.8135 8.46514 22.6921 8.25277 22.4494 7.82803C21.2663 5.75768 17.9392 1.1 11.9505 1.1Z" stroke="#000" strokeWidth="2.2" />
                <G transform="translate(7.55, 4.4)">
                  <Path d="M4.4 8.8C6.83005 8.8 8.8 6.83005 8.8 4.4C8.8 1.96995 6.83005 0 4.4 0C1.96995 0 0 1.96995 0 4.4C0 6.83005 1.96995 8.8 4.4 8.8Z" fill="#000" />
                </G>
              </Svg>
            </View>

            {/* Text Content */}
            <View style={styles.previewTextContainer}>
              <Text style={[styles.previewTitle, { color: '#000', fontSize: 28 * scale }]}>Lorem Ipsum</Text>
              <Text style={[styles.previewSub, { color: '#A5A5A5', fontSize: 13 * scale }]}>The quick brown fox jumps over the lazy dog</Text>
            </View>
            
            {/* Live Preview Watermark */}
            <View style={styles.previewWatermark}>
              <Svg width="14" height="10" viewBox="0 0 24 18" fill="none">
                <Path d="M12 1C6 1 2.7 5.7 1.5 7.8C1.2 8.3 1.1 8.5 1.1 8.8C1.1 9.1 1.3 9.3 1.5 9.7C3 11.8 6.8 16.5 12 16.5C17.2 16.5 21 11.8 22.4 9.7C22.6 9.3 22.8 9.1 22.8 8.8C22.8 8.5 22.7 8.3 22.4 7.8C21.3 5.8 18 1 12 1Z" stroke="#888" strokeWidth="2" />
                <G transform="translate(7.5, 4.5)">
                  <Path d="M4.5 9C7 9 9 7 9 4.5C9 2 7 0 4.5 0C2 0 0 2 0 4.5C0 7 2 9 4.5 9Z" fill="#888" />
                </G>
              </Svg>
              <Text style={styles.watermarkText}>Live preview</Text>
            </View>
          </View>
        </View>

        {/* Bottom Config Area */}
        <View style={[styles.bottomCard, { backgroundColor: colors.background }]}>
          <Text style={[styles.bottomCardTitle, { color: colors.text, fontSize: 32 * scale }]}>Notification</Text>
          <Text style={[styles.bottomCardSub, { color: colors.textSecondary, fontSize: 14 * scale }]}>How should we get your attention?</Text>

          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={[
                styles.optionBtn, 
                settings.notification === 'gentle' 
                  ? { backgroundColor: colors.text, borderColor: colors.text } 
                  : styles.optionBtnInactive,
                { borderColor: colors.text }
              ]} 
              onPress={() => handleUpdate({ notification: 'gentle' })}
              activeOpacity={0.7}
            >
              {/* Speaker/Volume icon */}
              <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={settings.notification === 'gentle' ? colors.background : colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M11 5L6 9H2v6h4l5 4V5z" />
                <Path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </Svg>
              <Text style={[styles.optionBtnText, { color: settings.notification === 'gentle' ? colors.background : colors.text }]}>Gentle</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.optionBtn, 
                settings.notification === 'none' 
                  ? { backgroundColor: colors.text, borderColor: colors.text } 
                  : styles.optionBtnInactive,
                { borderColor: colors.text }
              ]} 
              onPress={() => handleUpdate({ notification: 'none' })}
              activeOpacity={0.7}
            >
              {/* Muted speaker icon */}
              <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={settings.notification === 'none' ? colors.background : colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M11 5L6 9H2v6h4l5 4V5z" />
                <Line x1="23" y1="9" x2="17" y2="15" />
                <Line x1="17" y1="9" x2="23" y2="15" />
              </Svg>
              <Text style={[styles.optionBtnText, { color: settings.notification === 'none' ? colors.background : colors.text }]}>None</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.nextBtn, { backgroundColor: colors.text }]} onPress={handleNext} activeOpacity={0.8}>
            <Text style={[styles.nextBtnText, { color: colors.background }]}>Next Step</Text>
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.background} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <Path d="M5 12h14M12 5l7 7-7 7" />
            </Svg>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blobContainer: {
    position: 'absolute',
    height: 319,
    width: 345,
    left: -20,
    top: -15,
  },
  progressWrapper: {
    paddingHorizontal: 24,
    marginBottom: 24,
    paddingTop: 16,
    zIndex: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  previewSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
    zIndex: 10,
  },
  previewCard: {
    width: '100%',
    maxWidth: 320,
    aspectRatio: 1.5,
    borderRadius: 32,
    borderWidth: 2,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  previewCornerCutout: {
    position: 'absolute',
    top: -2,
    left: -2,
    zIndex: 2,
  },
  previewEyeContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  previewTextContainer: {
    marginTop: 'auto',
    marginBottom: 32,
  },
  previewTitle: {
    fontFamily: 'SourceSerifPro-SemiBold',
    marginBottom: 4,
  },
  previewSub: {
    fontFamily: 'Poppins-Regular',
  },
  previewWatermark: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  watermarkText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#888',
  },
  bottomCard: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
    marginTop: 'auto',
  },
  bottomCardTitle: {
    fontFamily: 'SourceSerifPro-SemiBold',
    marginBottom: 8,
  },
  bottomCardSub: {
    fontFamily: 'Poppins-Regular',
    marginBottom: 32,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 48,
  },
  optionBtn: {
    flex: 1,
    aspectRatio: 1.2,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  optionBtnInactive: {
    backgroundColor: 'transparent',
  },
  optionBtnText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  nextBtn: {
    borderRadius: 30,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  nextBtnText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});
