package Admin::Controller::Posts;
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

sub default :Path { 
    my ( $self, $c ) = @_;

    my $args = $c->req->params;
    use Data::Dumper;
    warn Dumper($args);
    
    my $showsRs = $c->model('MyModel::Posts')->search(
        {}, 
        { 
            order_by => { -asc => 'id'},
            rows     => $args->{rows} || 20,
            page     => $args->{page} || 1,
        });
    @{$c->stash->{posts}} = $showsRs->all;
    $c->stash->{current_view} = 'TT';
}

sub add :Local { 
    my ($self, $c) = @_;

    use Data::Dumper;
    $c->stash->{current_view} = 'TT';

    if ( $c->request->parameters->{form_submit} eq 'yes' ) {

        my $params = $c->req->params;

        foreach my $param ( keys %$params ) {
            if( ref($params->{$param}) ) { 
                $c->log->info(Dumper($params->{$param})); next; 
            }
            $c->log->info($params->{$param});
        }

        # Check for any invalid fileds
        my @invalid;
        foreach ('title', 'content' ) {
            if( !$params->{$_} ) {
                push @invalid, $_;
            }
        }
        if( scalar(@invalid) ) {
            $c->log->warn("Got invalid fields! @invalid");
            $c->stash->{error} = "The following field(s) are invalid: " . join(",", @invalid);
            return;
        }

        # If an image was uploaded
        my $image_name;
        if ( my $upload = $c->request->upload('file') ) {
            my $filename = $upload->filename;
            my $target   = "/var/www/media/images/$filename";
            $c->log->info("Got $filename and want to save it to $target");

            unless ( $upload->link_to($target) || $upload->copy_to($target) ) {
                $c->stash->{error} = "Failed to copy '$filename' to '$target': $!";
                return;
            }

            $image_name  = 'http://media.bottomdrawerbourbon.com/posts/' . $filename;
        } else {
            $c->log->info("Didn't see a file uploaded...");
        }

        $c->model('MyModel::Posts')->create({
            title      => $params->{'title'},
            post       => $params->{'content'},
            image      => $image_name || undef,
            front_page => $params->{'front_page'} ? 1 : 0,
            publish    => $params->{'publish'} ? 1 : 0,
        });
    }

    $c->stash->{message} = "New post uploaded";
}


=head1 AUTHOR

Nicholas McCamey,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

__PACKAGE__->meta->make_immutable;

1;
