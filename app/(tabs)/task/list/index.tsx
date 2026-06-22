import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useNavigation, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, G } from 'react-native-svg';
import { CrisisButton } from '@/components/crisis-button';
import { EditLabel } from '@/components/task-label';
import { TimerModal } from '@/components/TimerModal';
import { taskStore, Subtask, ALL_TASKS_INFO } from '@/utils/taskStore';
import { useTheme } from '@/theme/ThemeContext';

export default function SubtaskList() {
  const router = useRouter();
  const navigation = useNavigation();
  const { id: taskId = '1' } = useLocalSearchParams<{ id?: string }>();

  const taskInfo = ALL_TASKS_INFO.find(t => t.id === taskId);
  const { colors, scale } = useTheme();

  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Subtask[]>(taskStore.getTasks(taskId));

  useEffect(() => {
    setTasks(taskStore.getTasks(taskId));
  }, [taskId]);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' }
    });

    const unsubscribe = taskStore.subscribe(() => {
      setTasks(taskStore.getTasks(taskId));
    });

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'flex',
          backgroundColor: '#151515',
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          height: 80,
          position: 'absolute',
          borderTopWidth: 0,
        }
      });
      unsubscribe();
    };
  }, [navigation, taskId]);

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = () => {
    setEditingId(null);
  };

  const handleTaskChange = (id: string, newText: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, text: newText } : t);
    setTasks(updated);
    taskStore.setTasks(updated, taskId);
  };

  const handleDelete = (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    taskStore.setTasks(updated, taskId);
  };

  const handleAdd = () => {
    const newId = Date.now().toString();
    const updated = [...tasks, { id: newId, text: 'New subtask' }];
    setTasks(updated);
    taskStore.setTasks(updated, taskId);
    setEditingId(newId);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newTasks = [...tasks];
    const temp = newTasks[index - 1];
    newTasks[index - 1] = newTasks[index];
    newTasks[index] = temp;
    setTasks(newTasks);
    taskStore.setTasks(newTasks, taskId);
  };

  const handleMoveDown = (index: number) => {
    if (index === tasks.length - 1) return;
    const newTasks = [...tasks];
    const temp = newTasks[index + 1];
    newTasks[index + 1] = newTasks[index];
    newTasks[index] = temp;
    setTasks(newTasks);
    taskStore.setTasks(newTasks, taskId);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      <LinearGradient
        colors={[colors.secondary, colors.primary]}
        style={StyleSheet.absoluteFill}
      />

      {/* Background blob */}
      <View style={styles.blobContainer} pointerEvents="none">
        <Svg width="100%" height="100%" viewBox="0 0 345 319" fill="none">
          <G id="Group 77">
            <Path id="Vector" d="M216.317 137.566C219.494 139.907 222.654 141.915 225.459 144.344C239.227 156.297 242.865 174.143 234.454 188.071C229.739 195.864 222.56 200.357 214.019 202.833C202.683 206.127 191.123 206.34 179.464 205.108C178.361 204.996 177.264 204.917 175.576 204.779C176.084 206.676 176.528 208.125 176.847 209.603C178.802 218.846 181.649 228.024 182.487 237.364C185.739 273.74 159.259 299.228 122.946 295.267C106.782 293.506 92.584 287.173 80.1239 276.809C67.5864 266.373 57.8037 253.756 50.4998 239.222C40.679 219.675 33.319 199.162 27.1087 178.216C25.3052 172.13 26.5416 167.737 30.3927 165.024C33.9511 162.521 39.8465 162.803 44.2153 165.679C48.1657 168.299 48.5254 172.309 44.7657 175.214C43.017 176.557 42.3732 177.618 43.0655 179.783C55.7741 219.983 78.6862 251.43 118.695 268.263C121.199 269.318 123.823 270.08 126.42 270.932C149.952 278.615 166.728 258.47 165.812 241.167C165.478 234.958 164.206 228.635 162.288 222.714C160.042 215.789 157.022 209.03 153.529 202.642C151.128 198.241 147.352 194.586 144.122 190.647C143.132 189.431 141.796 188.492 140.826 187.265C136.611 181.98 136.786 175.164 141.183 170.835C145.424 166.64 152.232 166.286 157.244 170.604C170.593 182.138 186.45 184.318 203.166 183.326C206.387 183.128 209.736 182.276 212.69 180.978C220.337 177.628 222.685 168.985 217.009 162.905C213.547 159.194 208.688 156.304 203.912 154.411C196.752 151.564 189.066 150.044 181.692 147.693C176.409 146.012 173.316 141.719 173.329 136.897C173.348 131.945 176.354 127.747 181.441 125.812C183.039 125.199 184.737 124.862 186.407 124.451C189.618 123.673 193.037 123.419 195.996 122.105C203.415 118.803 211.174 115.799 217.806 111.259C228.298 104.091 230.246 93.3531 224.504 82.049C212.268 57.9821 188.589 45.1823 161.77 48.2521C116.79 53.4162 87.9689 84.0241 80.1167 121.407C75.9976 140.972 83.902 156.87 98.1087 169.844C104.29 175.497 109.953 175.117 116.662 169.875C116.896 169.697 117.089 169.491 117.333 169.333C119.987 167.55 122.551 164.455 126.07 167.03C129.303 169.405 128.956 173.074 128.072 176.501C126.279 183.497 121.835 188.043 114.877 189.901C104.983 192.552 95.5545 191.075 87.5623 184.753C71.9525 172.401 60.3733 157.176 57.1345 136.929C55.3892 126.036 57.676 115.431 61.5979 105.311C74.9954 70.7246 99.5182 48.1156 135.337 38.2429C152.842 33.4176 170.739 30.2729 188.904 33.6147C217.236 38.8334 234.838 56.799 243.579 83.3217C249.399 100.974 243.291 116.079 229.468 128.04C225.497 131.491 220.938 134.258 216.317 137.566Z" fill={colors.secondary} />
            <Path id="Vector_2" d="M314.903 112.298C309.808 128.988 300.1 141.346 284.074 148.125C278.049 150.671 271.72 151.908 265.147 150.8C259.012 149.772 254.709 145.894 253.668 140.628C252.643 135.416 255.184 130.124 260.409 126.831C262.107 125.769 263.877 124.745 265.753 124.083C287.439 116.379 297.414 100.065 299.342 78.055C299.787 72.9986 298.948 67.8254 298.771 62.6999C298.722 61.2526 298.958 59.7906 299.059 58.3382C300.511 58.7191 302.176 58.7681 303.397 59.5415C310.166 63.8209 313.957 70.3139 316.187 77.7937C319.705 89.5423 317.714 101.091 314.903 112.298Z" fill={colors.secondary} />
            <Path id="Vector_3" d="M337.189 162.318C328.7 187.291 309.938 198.299 284.877 195.384C279.544 194.759 275.029 192.267 272.272 187.399C270.184 183.716 270.099 179.837 272.638 176.439C275.034 173.246 278.12 171.723 282.652 172.16C286.622 172.546 290.764 170.908 294.848 170.356C313.659 167.795 324.057 156.054 329.433 138.805C329.776 137.704 329.961 136.524 330.498 135.546C331.059 134.543 331.976 133.728 332.735 132.833C333.588 133.679 334.796 134.383 335.235 135.402C339.131 144.43 339.358 153.721 337.189 162.318Z" fill={colors.secondary} />
            <Path id="Vector_4" d="M115.017 134.595C112.633 132.793 108.716 130.716 105.979 127.6C101.414 122.418 103.466 116.41 109.484 113.039C121.854 106.115 128.636 113.497 134.188 123.209C136.109 126.578 135.132 130.226 131.747 132.263C127.084 135.061 121.868 135.824 115.017 134.595Z" fill={colors.secondary} />
          </G>
        </Svg>
      </View>

      {/* Top Header Section */}
      <View style={styles.topSection}>
        <View style={styles.crisisBtn}>
          <CrisisButton onClick={() => router.push('/crisis-mode' as any)} />
        </View>
      </View>

      {/* Main Content Card */}
      <View style={[styles.card, { backgroundColor: colors.background }]}>

        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text, fontSize: 32 * scale }]} numberOfLines={2}>{taskInfo?.title || 'Task Details'}</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: 14 * scale }]}>{taskInfo?.subtitle || 'You only need to do the first one.'}</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/task')}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <Path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* Task List */}
        <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.taskList} showsVerticalScrollIndicator={false}>
          {tasks.map((item, index) => (
            <View key={item.id} style={styles.taskItem}>
              <EditLabel
                label={`#${index + 1}`}
                task={item.text}
                isEditing={editingId === item.id}
                onEdit={() => handleEdit(item.id)}
                onChange={(val) => handleTaskChange(item.id, val)}
                onSave={handleSave}
                onDelete={() => handleDelete(item.id)}
                onMoveUp={() => handleMoveUp(index)}
                onMoveDown={() => handleMoveDown(index)}
              />
            </View>
          ))}

          {/* Add Button */}
          <TouchableOpacity
            onPress={handleAdd}
            style={[styles.addButton, { backgroundColor: colors.text }]}
            activeOpacity={0.7}
          >
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M12 5V19M5 12H19" stroke={colors.background} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>

          {/* Start First Step Button */}
          <TouchableOpacity
            onPress={() => setIsTimerModalOpen(true)}
            style={[styles.startButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.7}
          >
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginTop: 2 }}>
              <Path d="M5 3L19 12L5 21V3Z" fill="#fff" />
            </Svg>
            <Text style={[styles.startText, { fontSize: 16 * scale }]}>Start First Step</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <TimerModal
        isOpen={isTimerModalOpen}
        onClose={() => setIsTimerModalOpen(false)}
        onStart={(hours, minutes, seconds) => {
          router.push({
            pathname: '/timer',
            params: { hours, minutes, seconds, taskId }
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blobContainer: {
    position: 'absolute',
    height: 318,
    width: 345,
    left: -81,
    top: -72,
    opacity: 0.5,
  },
  topSection: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    zIndex: 20,
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  crisisBtn: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  card: {
    position: 'absolute',
    top: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FCFEE8',
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    paddingTop: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 368,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontFamily: 'Poppins-SemiBold', 
    fontSize: 32,
    lineHeight: 42,
    color: '#151515',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: '#767676',
    marginTop: 4,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 8,
  },
  backText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  taskList: {
    alignItems: 'center',
    width: '100%',
    minWidth: '100%',
    marginTop: 10,
    paddingBottom: 40,
  },
  taskItem: {
    width: '100%',
    marginBottom: 24,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#1a1a1a',
    borderRadius: 30,
    marginTop: 0,
    marginBottom: 24,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    backgroundColor: '#418b7e',
    paddingVertical: 16, 
    borderRadius: 30,
    marginBottom: 20,
  },
  startText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
    lineHeight: 24, 
  }
});
