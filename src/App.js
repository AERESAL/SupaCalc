import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('Mathematics');
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownCategory, setDropdownCategory] = useState(null);

  // Formula data organized by category
  const mathFormulas = [
    'Quadratic Formula: x = (-b ± √(b²-4ac)) / 2a',
    'Pythagorean Theorem: a² + b² = c²',
    'Area of Circle: A = πr²',
    'Slope Formula: m = (y₂-y₁) / (x₂-x₁)',
    'Distance Formula: d = √((x₂-x₁)² + (y₂-y₁)²)',
    'Law of Cosines: c² = a² + b² - 2ab cos(C)',
    'Sum of Arithmetic Series: S = n/2(2a + (n-1)d)',
    'Compound Interest: A = P(1 + r/n)^(nt)',
    'Volume of Sphere: V = (4/3)πr³',
    'Surface Area of Cylinder: SA = 2πr² + 2πrh'
  ];

  const physicsFormulas = [
    'Newton\'s Second Law: F = ma',
    'Kinematic Equation: v = u + at',
    'Work-Energy Theorem: W = ΔKE',
    'Ohm\'s Law: V = IR',
    'Gravitational Force: F = Gm₁m₂/r²',
    'Wave Equation: v = fλ',
    'Einstein\'s Mass-Energy: E = mc²',
    'Coulomb\'s Law: F = kq₁q₂/r²',
    'Ideal Gas Law: PV = nRT',
    'Power Formula: P = VI'
  ];

  const chemistryFormulas = [
    'Ideal Gas Law: PV = nRT',
    'Molarity: M = moles/volume(L)',
    'pH Formula: pH = -log[H⁺]',
    'Boyle\'s Law: P₁V₁ = P₂V₂',
    'Charles\'s Law: V₁/T₁ = V₂/T₂',
    'Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA])',
    'Arrhenius Equation: k = Ae^(-Ea/RT)',
    'Beer\'s Law: A = εbc',
    'Nernst Equation: E = E° - (RT/nF)ln(Q)',
    'Rate Law: Rate = k[A]^m[B]^n'
  ];

  const renderNavigationButton = (category) => {
    const fullCategoryName = category === 'Math' ? 'Mathematics' : category;
    const isSelected = selectedCategory === fullCategoryName;
    
    return (
      <TouchableOpacity 
        key={category}
        style={[
          styles.navButton, 
          isSelected && styles.selectedNavButton
        ]}
        onPress={() => {
          setSelectedCategory(fullCategoryName);
          if (showDropdown && dropdownCategory === category) {
            setShowDropdown(false);
            setDropdownCategory(null);
          } else {
            setShowDropdown(true);
            setDropdownCategory(category);
          }
        }}
      >
        <Text style={[
          styles.navButtonText,
          isSelected && styles.selectedNavButtonText
        ]}>
          {category}
        </Text>
      </TouchableOpacity>
    );
  };

  const getFormulasForCategory = (category) => {
    const fullCategoryName = category === 'Math' ? 'Mathematics' : category;
    switch (fullCategoryName) {
      case 'Mathematics':
        return mathFormulas;
      case 'Physics':
        return physicsFormulas;
      case 'Chemistry':
        return chemistryFormulas;
      default:
        return [];
    }
  };

  const renderDropdownMenu = () => {
    if (!showDropdown || !dropdownCategory) return null;

    const formulas = getFormulasForCategory(dropdownCategory);
    const fullCategoryName = dropdownCategory === 'Math' ? 'Mathematics' : dropdownCategory;

    return (
      <View style={styles.dropdownContainer}>
        <View style={styles.dropdownHeader}>
          <Text style={styles.dropdownTitle}>{fullCategoryName} Formulas</Text>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => {
              setShowDropdown(false);
              setDropdownCategory(null);
            }}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.dropdownContent} showsVerticalScrollIndicator={false}>
          {formulas.map((formula, index) => (
            <TouchableOpacity key={index} style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>{formula}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderFormulaItem = (formula, index) => (
    <TouchableOpacity key={index} style={styles.formulaItem}>
      <Text style={styles.formulaText}>{formula}</Text>
    </TouchableOpacity>
  );

  const renderColumn = (title, formulas, color) => (
    <View style={[styles.column, { borderLeftColor: color }]}>
      <Text style={[styles.columnTitle, { color }]}>{title}</Text>
      <ScrollView style={styles.formulaList} showsVerticalScrollIndicator={false}>
        {formulas.map((formula, index) => renderFormulaItem(formula, index))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Navigation in one line */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>SupaCalc</Text>
        <View style={styles.navigationContainer}>
          {['Math', 'Physics', 'Chemistry'].map((category) => 
            renderNavigationButton(category)
          )}
        </View>
      </View>

      {/* Dropdown Menu */}
      {renderDropdownMenu()}

      {/* Original Three-Column Content */}
      <View style={styles.columnsContainer}>
        {renderColumn('Mathematics', mathFormulas, '#4A90E2')}
        {renderColumn('Physics', physicsFormulas, '#E94B3C')}
        {renderColumn('Chemistry', chemistryFormulas, '#50C878')}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 SupaCalc - Your Scientific Formula Companion
        </Text>
        <Text style={styles.footerSubtext}>
          Built with React Native for Web | Currently viewing: {selectedCategory}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  headerContainer: {
    backgroundColor: '#2c3e50',
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#95a5a6',
    minWidth: 80,
    alignItems: 'center',
  },
  selectedNavButton: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  navButtonText: {
    color: '#95a5a6',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  selectedNavButtonText: {
    color: '#ffffff',
  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
    maxHeight: 400,
    zIndex: 1000,
  },
  dropdownHeader: {
    backgroundColor: '#34495e',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownContent: {
    maxHeight: 320,
    padding: 15,
  },
  dropdownItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dropdownItemText: {
    fontSize: 13,
    color: '#2c3e50',
    lineHeight: 18,
    fontFamily: 'monospace',
  },
  columnsContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    gap: 20,
  },
  column: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  columnTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  formulaList: {
    flex: 1,
  },
  formulaItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  formulaText: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
    fontFamily: 'monospace',
  },
  footer: {
    backgroundColor: '#2c3e50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#34495e',
  },
  footerText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#95a5a6',
    textAlign: 'center',
  },
});

export default App;







