import React, { useState } from 'react';
import {
  Box, Container, Typography, Card, CardContent, CardActionArea, Grid, Chip, Button,
  TextField, InputAdornment, Paper, Avatar, Divider,
} from '@mui/material';
import {
  Article as ArticleIcon, Search as SearchIcon, Edit as EditIcon,
  Home as HomeIcon, Info as InfoIcon, CalendarMonth as CalendarIcon,
  MenuBook as SermonIcon, ContactMail as ContactIcon, Groups as GroupsIcon,
  Settings as SettingsIcon, ChildCare as ChildIcon, Face as YouthIcon,
  Female as WomenIcon, Male as MenIcon, Favorite as CouplesIcon,
  Newspaper as NewsIcon, Publish as PublishIcon, Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { contentService } from '../../services/api';

const pageMeta = {
  homepage: { icon: <HomeIcon />, color: '#1976d2', label: 'Homepage' },
  about: { icon: <InfoIcon />, color: '#388e3c', label: 'About Us' },
  ministries: { icon: <GroupsIcon />, color: '#c62828', label: 'Ministries' },
  events: { icon: <CalendarIcon />, color: '#f57c00', label: 'Events' },
  sermons: { icon: <SermonIcon />, color: '#7b1fa2', label: 'Sermons' },
  contact: { icon: <ContactIcon />, color: '#00838f', label: 'Contact' },
  news: { icon: <NewsIcon />, color: '#1565c0', label: 'News' },
  children: { icon: <ChildIcon />, color: '#4CAF50', label: "Children's Ministry" },
  youth: { icon: <YouthIcon />, color: '#2196F3', label: 'Youth Ministry' },
  women: { icon: <WomenIcon />, color: '#9C27B0', label: "Women's Ministry" },
  men: { icon: <MenIcon />, color: '#FF9800', label: "Men's Ministry" },
  couples: { icon: <CouplesIcon />, color: '#f44336', label: 'Young Couples Ministry' },
  footer: { icon: <SettingsIcon />, color: '#4e342e', label: 'Footer' },
};

const PageList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const pages = Object.entries(pageMeta)
    .filter(([key]) => key.includes(search.toLowerCase()))
    .map(([key, meta]) => {
      const status = contentService.getStatus(key);
      const hasDraft = !!contentService.getDraft(key);
      return { key, ...meta, status, hasDraft };
    });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          <ArticleIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Content Editor
        </Typography>
      </Box>

      <TextField
        fullWidth variant="outlined" placeholder="Search pages..."
        value={search} onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
        }}
      />

      <Grid container spacing={3}>
        {pages.map((page) => (
          <Grid item xs={12} sm={6} md={4} key={page.key}>
            <Card sx={{
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
              borderLeft: `4px solid ${page.color}`,
            }}>
              <CardActionArea onClick={() => navigate(`/admin/pages/${page.key}`)} sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" mb={1.5}>
                  <Avatar sx={{ bgcolor: page.color, width: 44, height: 44, mr: 2 }}>
                    {page.icon}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="h6">{page.label}</Typography>
                    <Typography variant="caption" color="textSecondary">/{page.key}</Typography>
                  </Box>
                </Box>
                <Box display="flex" gap={1} mb={2}>
                  <Chip label={page.status === 'published' ? 'Published' : 'Draft'}
                    size="small" color={page.status === 'published' ? 'success' : 'default'} />
                  {page.hasDraft && <Chip label="Edits" size="small" color="info" variant="outlined" />}
                </Box>
                <Button size="small" variant="outlined" fullWidth startIcon={<EditIcon />}>
                  Edit Content
                </Button>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PageList;
