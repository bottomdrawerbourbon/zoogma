package Site::Controller::Music;
use Moose;
use namespace::autoclean;

BEGIN {extends 'Catalyst::Controller'; }

=head1 NAME

Site::Controller::Band - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut

sub index :Path :Args(0) {
    my ( $self, $c ) = @_;

    $c->stash->{current_view} = 'JSON';
}

sub json :Local {
    my ( $self, $c ) = @_;
    $c->stash->{current_view} = 'JSON';

    my $params = $c->req->params || {};

    # Seach params. Default to items that are set to publish 1 and aren't the bio post
    my $search = { publish => 1, bio => 0 };

    # Allow calls for specific stories
    $search->{id} = $params->{id} if $params->{id};

    # Calling for the front page scroller
    $search->{front_page} = 1 if $params->{featured};

    my $postRs = $c->model('MyModel::Posts')->search($search, 
    { 
        order_by => { -desc => 'id'} ,
        page     => $params->{page} ? $params->{page} : 1,
        rows     => $params->{rows} ? $params->{rows} : 10,
    });

    my $results = {};
    my @data;
    while( my $post = $postRs->next ) {
        my $p = $post->post;
        $p =~ s/\r\n/<br \/>/g;
        $p =~ s/\n/<br \/>/g;
        push @data, {
            id            => $post->id, 
            title         => $post->title, 
            post          => $p,
            image_url     => $post->image,
            front_page    => $post->front_page,
            date_created  => $post->date_created->strftime("%F %T"),
            expanded_date => $post->date_created->strftime("%a, %B %d, %Y"),
        };
    }

    $results->{posts} = \@data;
    $results->{results_returned} = scalar(@data);
    $results->{total_results} = $postRs->pager->total_entries;
    
    $c->stash->{data} = $results;
}


=head1 AUTHOR

Nicholas McCamey,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

__PACKAGE__->meta->make_immutable;

1;
