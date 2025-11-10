import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  Paper
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    areasOfInterest: [],
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const serviceAreas = [
    'Worship Team',
    'Children\'s Ministry',
    'Youth Ministry',
    'Hospitality Team',
    'Tech Team',
    'Facilities Team',
    'Prayer Team',
    'Outreach & Missions',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setFormData(prev => ({
      ...prev,
      areasOfInterest: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (formData.areasOfInterest.length === 0) {
      newErrors.areasOfInterest = 'Please select at least one area of interest';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });
    
    try {
      // Replace with your actual form submission logic
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus({
        success: true,
        message: 'Thank you for your interest in volunteering! Our team will contact you soon.'
      });
      
      // Reset form on successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        areasOfInterest: [],
        message: ''
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'There was an error submitting your form. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}>
        Volunteer Interest Form
      </Typography>
      
      {submitStatus.message && (
        <Typography 
          color={submitStatus.success ? 'success.main' : 'error.main'} 
          sx={{ mb: 3, fontWeight: 500 }}
        >
          {submitStatus.message}
        </Typography>
      )}
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              required
              disabled={isSubmitting}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              required
              disabled={isSubmitting}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              required
              disabled={isSubmitting}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="(123) 456-7890"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl 
              fullWidth 
              error={!!errors.areasOfInterest}
              disabled={isSubmitting}
            >
              <InputLabel id="areas-of-interest-label">Areas of Interest *</InputLabel>
              <Select
                labelId="areas-of-interest-label"
                id="areas-of-interest"
                name="areasOfInterest"
                multiple
                value={formData.areasOfInterest}
                onChange={handleSelectChange}
                label="Areas of Interest *"
                renderValue={(selected) => selected.join(', ')}
              >
                {serviceAreas.map((area) => (
                  <MenuItem key={area} value={area}>
                    {area}
                  </MenuItem>
                ))}
              </Select>
              {errors.areasOfInterest && (
                <FormHelperText>{errors.areasOfInterest}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Additional Information"
              name="message"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={4}
              placeholder="Tell us about your skills, experience, or any other relevant information..."
              disabled={isSubmitting}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={24} /> : <SendIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                py: 1.5,
                px: 4,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Interest Form'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default VolunteerForm;
